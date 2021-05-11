'use strict';

const path = require('path');
const fs = require('fs');

const libDirectory = fs.realpathSync(process.cwd());
const resolveLib = relativePath => path.resolve(libDirectory, relativePath);
const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath);

module.exports = {
    libSrc: resolveLib('src'),
    libNodeModules: resolveLib('node_modules'),
    ownPath: resolveOwn('.'),
    ownNodeModules: resolveOwn('node_modules'),
};
