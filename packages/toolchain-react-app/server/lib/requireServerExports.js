const path = require('path');
const requireFromString = require('require-from-string');
const {readFile} = require('./fs');

const getServerFile = function getServerFile(stats) {
    const serverEntrypoint = stats.entrypoints[Object.keys(stats.entrypoints)[0]];
    const serverAsset = serverEntrypoint && serverEntrypoint.assets.find((asset) => /\.js$/.test(asset));

    if (serverAsset) {
        return path.resolve(`${stats.outputPath}/${serverAsset}`);
    }

    throw new Error('Unable to get built server file');
};

module.exports = async function requireServerExports(compiler, stats) {
    return await readFile(compiler.outputFileSystem, getServerFile(stats))
        .then(fileString => requireFromString(fileString))
};
