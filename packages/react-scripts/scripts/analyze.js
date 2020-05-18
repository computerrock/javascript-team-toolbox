'use strict';

const explore = require('source-map-explorer').default;
const chalk = require('chalk');
const paths = require('../config/paths');
const packageJSON = require(paths.appPackageJson);

const currentTime = new Date();
const currentTimeISOString = currentTime.toISOString().slice(0, 19).replace(/:/g, '');
const jsStatsFilename = `./stats/js-bundle-${packageJSON.version}-${currentTimeISOString}.html`;
const cssStatsFilename = `./stats/css-bundle-${packageJSON.version}-${currentTimeISOString}.html`;

explore('build/js/*.*', {
    output: {
        format: 'html',
        filename: jsStatsFilename,
    }
});

explore('build/css/*.*', {
    output: {
        format: 'html',
        filename: cssStatsFilename,
    }
});

// print messages
console.log(chalk.cyan(`Success! Analysis stats created in:`));
console.log(chalk.cyan(`   ${jsStatsFilename}`));
console.log(chalk.cyan(`   ${cssStatsFilename}`));
console.log();
