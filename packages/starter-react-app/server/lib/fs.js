const path = require('path');

const readFile = function readFile(fileSystem, fileName, encoding = 'utf8') {
    // Read the file contents
    return new Promise((resolve, reject) => {
        fileSystem.readFile(fileName, (err, buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer.toString(encoding));
            }
        });
    })
    // Eval as a nodejs module
        .catch((err) => {
            // Add extra info to the error
            err.detail = 'The error above was thrown while trying to load the built server file:\n';
            err.detail += path.relative('', fileName);
            throw err;
        });
};

module.exports = {
    readFile,
};
