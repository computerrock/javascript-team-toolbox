'use strict';

const path = require('path');

function getLintingPaths(context, sourcePaths = '', globPattern = '**/*.*') {
    if (typeof sourcePaths === 'string') {
        sourcePaths = [sourcePaths];
    }

    const lintingPaths = [];
    sourcePaths.forEach(sourcePath => {
        lintingPaths.push(path.join(path.posix.relative(context, sourcePath), globPattern));
    })

    return lintingPaths;
}

module.exports = getLintingPaths;
