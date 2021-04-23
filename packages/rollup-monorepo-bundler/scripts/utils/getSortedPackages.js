'use strict';

const fs = require('fs');
const {getPackages} = require('@lerna/project');
const {filterPackages} = require('@lerna/filter-packages');
const batchPackages = require('@lerna/batch-packages');

const getSortedPackages = async function getSortedPackages() {
    const projectDirectory = fs.realpathSync(process.cwd());
    const packages = await getPackages(projectDirectory);

    const singlePackage = packages.find(pkg => pkg.location === projectDirectory);
    if (singlePackage) {
        return [singlePackage];
    }

    const filtered = filterPackages(packages, [], [], true, false);
    return batchPackages(filtered)
        .reduce((arr, batch) => arr.concat(batch), []);
};

module.exports = getSortedPackages;
