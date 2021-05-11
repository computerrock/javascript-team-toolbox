'use strict';

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const appConfig = require(path.resolve(appDirectory, 'app.config.js'));
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const getSourcePaths = () => {
    const sourcePaths = [
        resolveApp('src'),
    ];
    (appConfig.moduleSourcePaths || []).forEach(moduleSourcePath => {
        sourcePaths.push(fs.realpathSync(process.cwd() + '/node_modules/' + moduleSourcePath));
    });

    return sourcePaths;
};

module.exports = getSourcePaths;
