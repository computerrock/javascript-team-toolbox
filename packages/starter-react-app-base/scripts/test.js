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

const jest = require('jest');
const argv = process.argv.slice(2);

// watch unless in coverage mode
if (!process.env.CI && argv.indexOf('--coverage') < 0) {
    argv.push('--watch');
}

jest.run(argv);
