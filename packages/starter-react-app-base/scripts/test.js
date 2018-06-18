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
const fs = require('fs');
const paths = require('../config/paths');
const NODE_ENV = process.env.NODE_ENV;
[
    `${paths.dotenv}.${NODE_ENV}.local`,
    `${paths.dotenv}.${NODE_ENV}`,
    `${paths.dotenv}`,
]
    .forEach(dotenvFile => {
        if (fs.existsSync(dotenvFile)) {
            require('dotenv-expand')(
                require('dotenv').config({
                    path: dotenvFile,
                })
            );
        }
    });

const jest = require('jest');
const argv = process.argv.slice(2);

// watch unless in coverage mode
if (!process.env.CI && argv.indexOf('--coverage') < 0) {
    argv.push('--watch');
}

jest.run(argv);
