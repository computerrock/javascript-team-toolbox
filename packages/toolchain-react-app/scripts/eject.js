// @remove-file-on-eject
'use strict';

// exit on unhandled rejections
process.on('unhandledRejection', err => {
    throw err;
});

const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const execSync = require('child_process').execSync;
const chalk = require('chalk');
const inquirer = require('@computerrock/react-dev-utils/inquirer');
const spawnSync = require('@computerrock/react-dev-utils/crossSpawn').sync;
const paths = require('../config/paths');

inquirer
    .prompt({
        type: 'confirm',
        name: 'shouldEject',
        message: 'Are you sure you want to eject? Reverting back this action is not simple!',
        default: false,
    })
    .then(answer => {
        if (!answer.shouldEject) {
            console.log(chalk.cyan('Eject aborted.'));
            return;
        }

        const gitStatus = getGitStatus();
        if (gitStatus) {
            console.error(
                chalk.red('This git repository has untracked files or uncommitted changes:')
                + '\n\n'
                + gitStatus.split('\n').map(line => line.match(/ .*/g)[0].trim()).join('\n')
                + '\n\n'
                + chalk.red('Remove untracked files, stash or commit any changes, and try again.'),
            );
            process.exit(1);
        }

        console.log('Ejecting...');

        const ownPath = paths.ownPath;
        const appPath = paths.appPath;

        function verifyAbsent(file) {
            if (fs.existsSync(path.join(appPath, file))) {
                console.error(
                    `\`${file}\` already exists in your app folder. We cannot `
                    + 'continue as you would lose all the changes in that file or directory. '
                    + 'Please move or delete it (maybe make a copy for backup) and run this '
                    + 'command again.',
                );
                process.exit(1);
            }
        }

        const folders = ['config', 'config/jest', 'scripts', 'server', 'server/lib'];

        // Make shallow array of files paths
        const files = folders.reduce((files, folder) => {
            return files.concat(fs
                .readdirSync(path.join(ownPath, folder))
                // set full path
                .map(file => path.join(ownPath, folder, file))
                // omit dirs from file list
                .filter(file => fs.lstatSync(file).isFile()));
        }, []);

        // Ensure that the app folder is clean and we won't override any files
        folders.forEach(verifyAbsent);
        files.forEach(verifyAbsent);

        console.log();
        console.log(chalk.cyan(`Copying files into ${appPath}`));

        folders.forEach(folder => {
            fs.mkdirSync(path.join(appPath, folder));
        });

        files.forEach(file => {
            let content = fs.readFileSync(file, 'utf8');

            // Skip flagged files
            if (content.match(/\/\/ @remove-file-on-eject/)) {
                return;
            }
            content =
                content
                    // Remove dead code from .js files on eject
                    .replace(/\/\/ @remove-on-eject-begin([\s\S]*?)\/\/ @remove-on-eject-end/gm, '')
                    // Remove dead code from .applescript files on eject
                    .replace(/-- @remove-on-eject-begin([\s\S]*?)-- @remove-on-eject-end/gm, '')
                    .trim() + '\n';
            console.log(`  Adding ${chalk.cyan(file.replace(ownPath, ''))} to the project`);
            fs.writeFileSync(file.replace(ownPath, appPath), content);
        });
        console.log();

        const ownPackage = require(path.join(ownPath, 'package.json'));
        const appPackage = require(path.join(appPath, 'package.json'));

        console.log(chalk.cyan('Updating the dependencies'));
        const ownPackageName = ownPackage.name;
        appPackage.dependencies = appPackage.dependencies || {};
        if (appPackage.dependencies[ownPackageName]) {
            console.log(`  Removing ${chalk.cyan(ownPackageName)} from dependencies`);
            delete appPackage.dependencies[ownPackageName];
        }
        Object.keys(ownPackage.dependencies).forEach(key => {
            // For some reason optionalDependencies end up in dependencies after install
            if (
                ownPackage.optionalDependencies &&
                ownPackage.optionalDependencies[key]
            ) {
                return;
            }
            console.log(`  Adding ${chalk.cyan(key)} to dependencies`);
            appPackage.dependencies[key] = ownPackage.dependencies[key];
        });
        // Sort the deps
        const unsortedDependencies = appPackage.dependencies;
        appPackage.dependencies = {};
        Object.keys(unsortedDependencies)
            .sort()
            .forEach(key => {
                appPackage.dependencies[key] = unsortedDependencies[key];
            });
        console.log();

        console.log(chalk.cyan('Updating the scripts'));
        delete appPackage.scripts['eject'];
        Object.keys(appPackage.scripts).forEach(key => {
            Object.keys(ownPackage.bin).forEach(binKey => {
                const regex = new RegExp(binKey + ' (\\w+)', 'g');
                if (!regex.test(appPackage.scripts[key])) {
                    return;
                }
                appPackage.scripts[key] = appPackage.scripts[key].replace(regex, 'node scripts/$1.js');
                console.log(`  Replacing ${chalk.cyan(`"${binKey} ${key}"`)} with ${chalk.cyan(`"node scripts/${key}.js"`)}`,
                );
            });
        });

        // Update Jest config
        const jestConfig = path.join(appPath, 'jest.config.js');
        if (fs.existsSync(jestConfig)) {
            console.log(`  Updating ${chalk.cyan('jest.config.js')} configuration`);
            let content = fs.readFileSync(jestConfig, 'utf8');
            content = content.replace(/@computerrock\/toolchain-react-app\/config\/jest\/babelTransform/g, '<rootDir>/node_modules/babel-jest');
            content = content.replace(/@computerrock\/toolchain-react-app/g, '<rootDir>');

            try {
                fs.writeFileSync(jestConfig, content, 'utf8');
            } catch (e) {
                console.log(`  Updating ${chalk.red('jest.config.js')} failed!`);
            }
        }
        console.log();

        // Copy additional .rc configuration files
        console.log(chalk.cyan('Copying .rc configuration files'));
        const rcConfigurationFiles = ['.babelrc', '.eslintrc', '.stylelintrc', 'nodemon.json'];
        rcConfigurationFiles.forEach(file => {
            const rcFilePath = path.join(ownPath, 'config/rc', file);
            if (!fs.existsSync(rcFilePath) || !fs.lstatSync(rcFilePath).isFile()) {
                console.log(`  Skipping file - not found or is folder: ${file}`);
                return;
            }

            if (fs.existsSync(path.join(appPath, file))) {
                console.log(`  Skipping file - exist at target: ${file}`);
                return;
            }

            console.log(`  Copying file: ${file}`);
            fs.copySync(rcFilePath, path.join(appPath, file));
        });
        console.log();

        // Write package.json file
        fs.writeFileSync(path.join(appPath, 'package.json'), JSON.stringify(appPackage, null, 2) + os.EOL);
        console.log();

        // remove toolchain binaries from app node_modules
        if (ownPath.indexOf(appPath) === 0) {
            try {
                Object.keys(ownPackage.bin).forEach(binKey => {
                    fs.removeSync(path.join(appPath, 'node_modules', '.bin', binKey));
                });
                fs.removeSync(ownPath);
            } catch (e) {
                // It's not essential that this succeeds
            }
        }

        if (fs.existsSync(path.join(appPath, 'yarn.lock'))) {
            console.log(chalk.cyan('Running yarn...'));
            spawnSync('yarnpkg', ['--cwd', process.cwd()], {stdio: 'inherit'});
        } else {
            console.log(chalk.cyan('Running npm install...'));
            spawnSync('npm', ['install', '--loglevel', 'error'], {
                stdio: 'inherit',
            });
        }
        console.log(chalk.green('Ejected successfully!'));
        console.log();

        if (tryGitAdd(appPath)) {
            console.log(chalk.cyan('Staged ejected files for commit.'));
            console.log();
        }
    });

function getGitStatus() {
    try {
        let stdout = execSync(`git status --porcelain`, {
            stdio: ['pipe', 'pipe', 'ignore'],
        }).toString();
        return stdout.trim();
    } catch (e) {
        return '';
    }
}

function tryGitAdd(appPath) {
    try {
        spawnSync(
            'git',
            ['add', path.join(appPath, '/.')],
            {stdio: 'inherit'},
        );

        return true;
    } catch (e) {
        return false;
    }
}
