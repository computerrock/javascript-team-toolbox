'use strict';

const path = require('path');
const fs = require('fs');
const resolveFrom = require('resolve-from');
const findPkg = require('find-pkg');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const getBundlerConfigPaths = (bundlerDirectory) => {
    const sourcePaths = [];

    try {
        const bundlerConfig = require(path.resolve(bundlerDirectory, 'bundler.config.js'));
        (bundlerConfig.sourceModules || []).forEach(sourceModule => {
            try {
                const resolvedPath = resolveFrom(bundlerDirectory, sourceModule);
                const modulePkgPath = findPkg.sync(resolvedPath);

                sourcePaths.push(fs.realpathSync(modulePkgPath.replace('/package.json', '/src')));

                const sourceModulePaths = getBundlerConfigPaths(fs.realpathSync(modulePkgPath.replace('/package.json', '')));
                sourceModulePaths.forEach(sourceModulePath => sourcePaths.push(sourceModulePath));
            } catch (error) {
                // no-op
            }
        });
    } catch (error) {
        // no-op
    }

    return sourcePaths;
};

const getModuleSourcePaths = () => {
    const sourcePaths = [
        resolveApp('src'),
    ];

    const sourceModulePaths = getBundlerConfigPaths(appDirectory);
    sourceModulePaths.forEach(sourceModulePath => sourcePaths.push(sourceModulePath));

    return [...new Set(sourcePaths)];
};

module.exports = getModuleSourcePaths;
