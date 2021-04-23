'use strict';

const path = require('path');
const loadConfigFile = require('rollup/dist/loadConfigFile');
const getSortedPackages = require('./getSortedPackages');
const createRollupConfig = require('../../config/rollup.config');

const getRollupConfig = async function getRollupConfig() {
    const packages = await getSortedPackages();

    // generate config for each package
    return Promise.all(packages.map(async (pkg) => {
        const basePath = path.relative(__dirname, pkg.location);
        let packageRollupConfig;
        try {
            const {options, warnings} = await loadConfigFile(path.join(__dirname, basePath, 'rollup.config.js'), {format: 'es'});
            packageRollupConfig = {pkg, options, warnings};
        } catch (e) {
            // no-op
        }

        return packageRollupConfig;
    })).then(results => {
        const packageConfigs = results.filter(Boolean);
        const config = [];

        packageConfigs.forEach(({pkg, options}) => {
            config.push(createRollupConfig(pkg, options))
        });

        return config;
    });
};

module.exports = getRollupConfig;
