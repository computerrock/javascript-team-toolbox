'use strict';

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const bundlerConfig = require(path.resolve(appDirectory, 'bundler.config.js'));
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const getModuleSourcePaths = () => {
    const sourcePaths = [
        resolveApp('src'),
    ];
    (bundlerConfig.sourceModules || []).forEach(sourceModule => {
        sourcePaths.push(fs.realpathSync(process.cwd() + '/node_modules/' + sourceModule + '/src'));
    });

    return sourcePaths;
};

module.exports = getModuleSourcePaths;
