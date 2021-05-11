'use strict';

// set environment
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// exit on unhandled rejections
process.on('unhandledRejection', err => {
    throw err;
});

// load env variables
require('../config/env');

// @remove-on-eject-begin
// Do the pre-flight dependency check (only happens before eject).
const verifyPackageTree = require('./utils/verifyPackageTree');
if (process.env.SKIP_PREFLIGHT_CHECK !== 'true') {
    verifyPackageTree();
}
// @remove-on-eject-end

const jest = require('jest');
const execSync = require('child_process').execSync;
const argv = process.argv.slice(2);

function isInGitRepository() {
    try {
        execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
        return true;
    } catch (e) {
        return false;
    }
}

// watch unless on CI or in coverage mode
if (!process.env.CI && argv.indexOf('--coverage') < 0) {
    argv.push(isInGitRepository() ? '--watch' : '--watchAll');
}

jest.run(argv);
