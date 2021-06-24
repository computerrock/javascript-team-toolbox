'use strict';

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// TODO remove support for `app.config.js` in next major release
let bundlerConfig;
try {
    bundlerConfig = require(path.resolve(appDirectory, 'bundler.config.js'));
} catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') {
        throw error;
    }
    chalk.red('`app.config.js` will be removed in next major release. Please use ' +
        '`bundler.config.js` for bundler configuration.');
    bundlerConfig = require(path.resolve(appDirectory, 'app.config.js'));
}

const getModuleSourcePaths = () => {
    const sourcePaths = [
        resolveApp('src'),
    ];
    (bundlerConfig.moduleSourcePaths || []).forEach(moduleSourcePath => {
        sourcePaths.push(fs.realpathSync(process.cwd() + '/node_modules/' + moduleSourcePath));
    });

    return sourcePaths;
};

module.exports = getModuleSourcePaths;
