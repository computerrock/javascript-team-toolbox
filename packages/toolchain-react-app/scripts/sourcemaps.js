'use strict';

// set environment
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// exit on unhandled rejections
process.on('unhandledRejection', err => {
    throw err;
});

// load env variables
require('../config/env');
const paths = require('../config/paths');
const packageJSON = require(paths.appPackageJson);

const chalk = require('chalk');
const execSync = require('child_process').execSync;

// exit if Datadog not enabled
if (!process.env.DATADOG_ENABLE) {
    console.log(chalk.blue('Datadog not enabled: skipping sourcemaps upload.\n'));
    process.exit(0);
}

try {
    execSync(`
npx --yes -q @datadog/datadog-ci sourcemaps upload ${paths.appBuild} \
--service=${process.env.DATADOG_SERVICE} \
--release-version=${packageJSON.version} \
--minified-path-prefix=${process.env.DATADOG_SOURCEMAPS_URL}
`, {stdio: 'inherit'});
} catch (e) {
    process.exit(0);
}
