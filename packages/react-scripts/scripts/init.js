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

function isInGitRepository() {
    try {
        execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
        return true;
    } catch (e) {
        return false;
    }
}

function tryGitInit() {
    try {
        execSync('git --version', { stdio: 'ignore' });
        if (isInGitRepository()) {
            return false;
        }

        execSync('git init', { stdio: 'ignore' });
        return true;
    } catch (e) {
        console.warn('Git repo not initialized', e);
        return false;
    }
}

function tryGitCommit(appPath) {
    try {
        const message = 'Initialize project using @computerrock/react-scripts (Create React App)';
        const author = 'Computer Rock <tech@computerrock.com>';
        execSync('git add -A', { stdio: 'ignore' });
        execSync('git commit -m "' + message + '" --author="' + author + '"', {
            stdio: 'ignore',
        });
        return true;
    } catch (e) {
        console.warn('Git commit not created', e);
        console.warn('Removing .git directory...');
        try {
            // unlinkSync() doesn't work on directories.
            fs.removeSync(path.join(appPath, '.git'));
        } catch (removeErr) {
            // Ignore.
        }
        return false;
    }
}

module.exports = function(
    appPath,
    appName,
    verbose,
    originalDirectory,
    templateName
) {
    const appPackage = require(path.join(appPath, 'package.json'));
    const useYarn = fs.existsSync(path.join(appPath, 'yarn.lock'));

    if (!templateName) {
        console.log('');
        console.error(
            `A template was not provided. This is likely because you're using an outdated version of ${chalk.cyan(
                'create-react-app'
            )}.`
        );
        console.error(
            `Please note that global installs of ${chalk.cyan(
                'create-react-app'
            )} are no longer supported.`
        );
        return;
    }

    const templatePath = path.dirname(
        require.resolve(`${templateName}/package.json`, { paths: [appPath] })
    );

    let templateJsonPath;
    if (templateName) {
        templateJsonPath = path.join(templatePath, 'template.json');
    }

    let templateJson = {};
    if (fs.existsSync(templateJsonPath)) {
        templateJson = require(templateJsonPath);
    }

    const templatePackage = templateJson.package || {};

    // Keys to ignore in templatePackage
    const templatePackageBlacklist = [
        'version',
        'devDependencies',
        'peerDependencies',
        'bundledDependencies',
        'optionalDependencies',
        'engineStrict',
        'os',
        'cpu',
        'preferGlobal',
    ];

    // Keys from templatePackage that will be merged with appPackage
    const templatePackageToMerge = ['dependencies', 'scripts'];

    // Keys from templatePackage that will be added to appPackage,
    // replacing any existing entries.
    const templatePackageToReplace = Object.keys(templatePackage).filter(key => {
        return (
            !templatePackageBlacklist.includes(key) &&
            !templatePackageToMerge.includes(key)
        );
    });

    // Add templatePackage keys/values to appPackage, replacing existing entries
    templatePackageToReplace.forEach(key => {
        if (key === 'name') {
            appPackage[key] = (templatePackage[key] || '@computerrock/application-name')
                .replace('application-name', appName);
            return;
        }

        appPackage[key] = templatePackage[key];
    });

    // Ensure 'dependencies' key order in package.json
    const tempDependencies = appPackage.dependencies;
    delete appPackage.dependencies;
    appPackage.dependencies = tempDependencies;

    // Setup the script rules
    const templateScripts = templatePackage.scripts || {};
    appPackage.scripts = Object.assign(
        {
            start: 'react-scripts start',
            build: 'react-scripts build',
            test: 'react-scripts test',
            eject: 'react-scripts eject',
        },
        templateScripts
    );

    // Update scripts for Yarn users
    if (useYarn) {
        appPackage.scripts = Object.entries(appPackage.scripts).reduce(
            (acc, [key, value]) => ({
                ...acc,
                [key]: value.replace(/(npm run |npm )/, 'yarn '),
            }),
            {}
        );
    }

    fs.writeFileSync(
        path.join(appPath, 'package.json'),
        JSON.stringify(appPackage, null, 2) + os.EOL
    );

    const readmeExists = fs.existsSync(path.join(appPath, 'README.md'));
    if (readmeExists) {
        fs.renameSync(
            path.join(appPath, 'README.md'),
            path.join(appPath, 'README.old.md')
        );
    }

    // Copy the files for the user
    const templateDir = path.join(templatePath, 'template');
    if (fs.existsSync(templateDir)) {
        fs.copySync(templateDir, appPath);
    } else {
        console.error(
            `Could not locate supplied template: ${chalk.green(templateDir)}`
        );
        return;
    }

    const gitignoreExists = fs.existsSync(path.join(appPath, '.gitignore'));
    if (gitignoreExists) {
        // Append if there's already a `.gitignore` file there
        const data = fs.readFileSync(path.join(appPath, 'gitignore'));
        fs.appendFileSync(path.join(appPath, '.gitignore'), data);
        fs.unlinkSync(path.join(appPath, 'gitignore'));
    } else {
        // Rename gitignore after the fact to prevent npm from renaming it to .npmignore
        // See: https://github.com/npm/npm/issues/1862
        fs.moveSync(
            path.join(appPath, 'gitignore'),
            path.join(appPath, '.gitignore'),
            []
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
        args = ['install', '--save', verbose && '--verbose'].filter(e => e);
    }

    // Install additional template dependencies, if present
    const templateDependencies = templatePackage.dependencies;
    if (templateDependencies) {
        args = args.concat(
            Object.keys(templateDependencies).map(key => {
                return `${key}@${templateDependencies[key]}`;
            })
        );
    }

    // Install react and react-dom for backward compatibility with old CRA cli
    // which doesn't install react and react-dom along with react-scripts
    if (!isReactInstalled(appPackage)) {
        args = args.concat(['react', 'react-dom']);
    }

    // Install template dependencies, and react and react-dom if missing.
    if ((!isReactInstalled(appPackage) || templateName) && args.length > 1) {
        console.log();
        console.log(`Installing template dependencies using ${command}...`);

        const proc = spawn.sync(command, args, { stdio: 'inherit' });
        if (proc.status !== 0) {
            console.error(`\`${command} ${args.join(' ')}\` failed`);
            return;
        }
    }

    // Remove template
    console.log(`Removing template package using ${command}...`);
    console.log();

    const proc = spawn.sync(command, [remove, templateName], {
        stdio: 'inherit',
    });
    if (proc.status !== 0) {
        console.error(`\`${command} ${args.join(' ')}\` failed`);
        return;
    }

    // Create git commit if git repo was initialized
    if (initializedGit && tryGitCommit(appPath)) {
        console.log();
        console.log('Created git commit.');
    }

    // Change displayed command to yarn instead of yarnpkg
    const displayedCommand = useYarn ? 'yarn' : 'npm';

    // print logo
    printCompanyLogo();

    // print final messages
    console.log(`Success! Project @computerrock/${appName} created at ${appPath}`);
    console.log();
    console.log('We suggest that you begin by reading README.md file. Update package.json and');
    console.log('README.md according to your project requirements.');
    console.log();
    console.log('Inside project directory, you can run:');
    console.log(chalk.cyan(`  ${displayedCommand} start`));
    console.log('    Starts the development server.');
    console.log();
    console.log(chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}build`));
    console.log('    Bundles the app into static files for production.');
    console.log();
    console.log(chalk.cyan(`  ${displayedCommand} test`));
    console.log('    Starts the test runner.');
    console.log();
    console.log(chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}eject`));
    console.log('    Removes @computerrock/react-scripts dependency and copies configuration files');
    console.log('    and build scripts into the app directory. Reverting back this action is not simple!');
    console.log();
    console.log('Happy coding!!!');
};

function isReactInstalled(appPackage) {
    const dependencies = appPackage.dependencies || {};

    return (
        typeof dependencies.react !== 'undefined' &&
        typeof dependencies['react-dom'] !== 'undefined'
    );
}
