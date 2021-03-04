'use strict';

const path = require('path');

function getStylelintPaths(context, sourcePaths = '', globPattern = '**/*.(s(c|a)ss|css)') {
    if (typeof sourcePaths === 'string') {
        sourcePaths = [sourcePaths];
    }

    const styleLintPaths = [];
    sourcePaths.forEach(sourcePath => {
        styleLintPaths.push(path.join(path.posix.relative(context, sourcePath), globPattern));
    })

    return styleLintPaths;
}

module.exports = getStylelintPaths;
