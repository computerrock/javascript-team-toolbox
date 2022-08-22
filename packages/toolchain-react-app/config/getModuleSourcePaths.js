'use strict';

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const getModuleSourcePaths = () => {
    const sourcePaths = [
        resolveApp('src'),
    ];

    const bundlerConfig = require(path.resolve(appDirectory, 'bundler.config.js'));
    (bundlerConfig.sourceModules || []).forEach(sourceModule => {
        const modulePath = process.cwd() + '/node_modules/' + sourceModule;
        sourcePaths.push(fs.realpathSync(modulePath + '/src'));

        try {
            const sourceModuleBundlerConfig = require(fs.realpathSync(modulePath + '/bundler.config.js'));

            (sourceModuleBundlerConfig.sourceModules || []).forEach(sourceModule => {
                sourcePaths.push(fs.realpathSync(modulePath + '/node_modules/' + sourceModule + '/src'));
            });
        } catch (error) {
            // no-op
        }
    });

    return [...new Set(sourcePaths)];
};

module.exports = getModuleSourcePaths;
