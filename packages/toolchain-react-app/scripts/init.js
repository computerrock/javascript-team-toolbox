// @remove-file-on-eject
'use strict';

// exit on unhandled rejections
process.on('unhandledRejection', err => {
    throw err;
});

const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const chalk = require('chalk');
const spawn = require('@computerrock/react-dev-utils/crossSpawn');
const printCompanyLogo = require('@computerrock/react-dev-utils/printCompanyLogo');
const execSync = require('child_process').execSync;
const paths = require('../config/paths');

module.exports = function (
    projectPath,
    projectName,
    template,
    programDirectory,
    verbose,
    useYarn,
) {
    const projectPackage = require(path.join(projectPath, 'package.json'));
    const templatePackage = template['package'] || {};

    // Keys to ignore in templatePackage
    const templatePackageIgnoreList = [
        'version',
        'scripts',
        'bundledDependencies',
        'optionalDependencies',
        'engineStrict',
        'os',
        'cpu',
        'preferGlobal',
    ];

    // Keys from templatePackage that will be merged with projectPackage
    const templatePackageToMerge = ['devDependencies', 'dependencies', 'peerDependencies'];

    // Keys from templatePackage that will be added to projectPackage, replacing any existing entries.
    const templatePackageToReplace = Object.keys(templatePackage).filter(key => {
        return !templatePackageIgnoreList.includes(key) && !templatePackageToMerge.includes(key);
    });

    // Add templatePackage keys/values to projectPackage, replacing existing entries
    templatePackageToReplace.forEach(key => {
        if (key === 'name') {
            projectPackage[key] = (templatePackage[key] || 'project-name').replace('project-name', projectName);
            return;
        }

        projectPackage[key] = templatePackage[key];
    });

    // Add templatePackage keys/value, merging with existing entries
    templatePackageToMerge
        .filter(key => projectPackage[key] && templatePackage[key])
        .forEach(key => {
            projectPackage[key] = {
                ...projectPackage[key],
                ...templatePackage[key],
            };
        });

    // Ensure 'dependencies' key order in package.json
    const tempDependencies = projectPackage.dependencies;
    delete projectPackage.dependencies;
    projectPackage.dependencies = tempDependencies;

    // Setup package scripts
    const templateScripts = templatePackage.scripts || {};
    projectPackage.scripts = Object.assign(
        {
            start: 'react-scripts start',
            test: 'react-scripts test',
            build: 'react-scripts build',
            eject: 'react-scripts eject',
        },
        templateScripts,
    );

    // Update scripts for Yarn users
    if (useYarn) {
        projectPackage.scripts = Object.entries(projectPackage.scripts)
            .reduce((acc, [key, value]) => ({
                ...acc,
                [key]: value.replace(/(npm run |npm )/, 'yarn '),
            }), {});
    }

    fs.writeFileSync(
        path.join(projectPath, 'package.json'),
        JSON.stringify(projectPackage, null, 2) + os.EOL,
    );

    const readmeExists = fs.existsSync(path.join(projectPath, 'README.md'));
    if (readmeExists) {
        fs.renameSync(
            path.join(projectPath, 'README.md'),
            path.join(projectPath, 'README.old.md'),
        );
    }

    // Copy .rc configuration files
    const rcConfigurationFiles = [
        '.env.example',
        '.browserslistrc',
        '.nvmrc',
        'gitignore',
        'jest.config.js',
        'bundler.config.js',
    ];
    rcConfigurationFiles.forEach(file => {
        const rcFilePath = path.join(paths.ownPath, 'config/rc', file);
        if (!fs.existsSync(rcFilePath) || !fs.lstatSync(rcFilePath).isFile()) return;
        if (fs.existsSync(path.join(projectPath, file))) return;

        fs.copySync(rcFilePath, path.join(projectPath, file));
    });

    // Copy template files
    const templateDir = path.join(template['path'], 'template');
    if (fs.existsSync(templateDir)) {
        fs.copySync(templateDir, projectPath);
    } else {
        console.error(
            `Could not locate supplied template: ${chalk.green(templateDir)}`,
        );
        return;
    }

    // Set .gitignore file
    const gitignoreExists = fs.existsSync(path.join(projectPath, '.gitignore'));
    if (gitignoreExists) {
        // Append if there's already a `.gitignore` file there
        const data = fs.readFileSync(path.join(projectPath, 'gitignore'));
        fs.appendFileSync(path.join(projectPath, '.gitignore'), data);
        fs.unlinkSync(path.join(projectPath, 'gitignore'));
    } else {
        // Rename gitignore after the fact to prevent npm from renaming it to .npmignore
        // See: https://github.com/npm/npm/issues/1862
        fs.moveSync(
            path.join(projectPath, 'gitignore'),
            path.join(projectPath, '.gitignore'),
            [],
        );
    }

    // Initialize git repo
    let initializedGit = false;
    if (tryGitInit()) {
        initializedGit = true;
        console.log();
        console.log('Initialized a git repository.');
    }

    let command;
    let remove;
    let args;

    if (useYarn) {
        command = 'yarnpkg';
        remove = 'remove';
        args = ['add'];
    } else {
        command = 'npm';
        remove = 'uninstall';
        args = ['install', '--save', '--legacy-peer-deps', verbose && '--verbose'].filter(e => e);
    }

    // Install additional template dependencies
    const templateDependencies = templatePackage.dependencies;
    if (templateDependencies) {
        args = args.concat(
            Object.keys(templateDependencies).map(key => {
                return `${key}@${templateDependencies[key]}`;
            }),
        );
    }
    if (args.length > 1) {
        console.log();
        console.log(`Installing template dependencies using ${command}...`);

        const proc = spawn.sync(command, args, {stdio: 'inherit'});
        if (proc.status !== 0) {
            console.error(`\`${command} ${args.join(' ')}\` failed`);
            return;
        }
    }

    // Remove Toolchain CLI template from dependencies
    console.log(`Removing template package using ${command}...`);
    console.log();
    const proc = spawn.sync(command, [remove, template['name']], {
        stdio: 'inherit',
    });
    if (proc.status !== 0) {
        console.error(`\`${command}\` failed`);
        return;
    }

    // Create git commit if git repo was initialized
    if (initializedGit && tryGitCommit(projectPath, template['name'])) {
        console.log();
        console.log('Created git commit.');
    }

    // Change displayed command to yarn instead of yarnpkg
    const displayedCommand = useYarn ? 'yarn' : 'npm';

    // print logo
    printCompanyLogo();

    // print final messages
    console.log(`Success! Project @computerrock/${projectName} created at ${projectPath}`);
    console.log();
    console.log('We suggest that you start by checking out README.md file. Please, update');
    console.log('package.json and README.md according to your project requirements.');
    console.log();
    console.log('Inside project directory, you can run:');
    console.log(chalk.cyan(`  ${displayedCommand} start`));
    console.log('    Starts the development server.');
    console.log();
    console.log(chalk.cyan(`  ${displayedCommand} test`));
    console.log('    Starts the test runner.');
    console.log();
    console.log(chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}build`));
    console.log('    Bundles the app into static files for production. Results are place in /build folder.');
    console.log();
    console.log(chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}eject`));
    console.log('    Removes @computerrock/toolchain-react-app dependency and copies configuration files');
    console.log('    and build scripts into the app directory. Reverting back this action is not simple!');
    console.log();
    console.log('Happy coding!!!');
};

function isInGitRepository() {
    try {
        execSync('git rev-parse --is-inside-work-tree', {stdio: 'ignore'});
        return true;
    } catch (e) {
        return false;
    }
}

function tryGitInit() {
    try {
        execSync('git --version', {stdio: 'ignore'});
        if (isInGitRepository()) {
            return false;
        }

        execSync('git init', {stdio: 'ignore'});
        return true;
    } catch (e) {
        console.warn('Git repo not initialized', e);
        return false;
    }
}

function tryGitCommit(projectPath, templateName) {
    try {
        const message = `Initialize project using template ${templateName} (Toolchain CLI)`;
        const author = 'Computer Rock <tech@computerrock.com>';
        execSync('git add -A', {stdio: 'ignore'});
        execSync('git commit -m "' + message + '" --author="' + author + '"', {
            stdio: 'ignore',
        });
        return true;
    } catch (e) {
        console.warn('Git commit not created', e);
        console.warn('Removing .git directory...');
        try {
            // unlinkSync() doesn't work on directories.
            fs.removeSync(path.join(projectPath, '.git'));
        } catch (removeErr) {
            // Ignore.
        }
        return false;
    }
}
