'use strict';

// set environment
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// exit on unhandled rejections
process.on('unhandledRejection', err => {
    throw err;
});

const rollup = require('rollup');
const chalk = require('chalk');
const clearConsole = require('@computerrock/react-dev-utils/clearConsole');
const getRollupConfig = require('./utils/getRollupConfig');

getRollupConfig()
    .then(async options => {
        let bundle;
        try {
            for (const optionsObj of options) {
                bundle = await rollup.rollup(optionsObj);
                await Promise.all(optionsObj.output.map(bundle.write));
            }
        } catch (error) {
            // do some error reporting
            console.error(error);
        }

        if (bundle) {
            // closes the bundle
            await bundle.close();
        }

        const watcher = rollup.watch(options);

        watcher.on('event', ({code, result}) => {
            if (code === 'START') {
                clearConsole();
                console.log('Compiling...');
                console.log();
            }

            if (code === 'ERROR') {
                console.log(chalk.red('Failed to compile.'));
                console.log();
                process.exit(1);
            }

            if (code === 'END') {
                console.log();
                console.log(chalk.green('Compiled!'));
            }

            if (result) {
                result.close();
            }
        });
    });
