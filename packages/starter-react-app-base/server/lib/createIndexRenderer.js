const path = require('path');
const {readFile} = require('./fs');

const generateIndexTemplate = function createIndexTemplate(stats) {
    const normalizeAssets = assets => {
        return Array.isArray(assets) ? assets : [assets];
    };

    const assetsByChunkName = stats.assetsByChunkName;
    const styleAssets = normalizeAssets(assetsByChunkName.main)
        .filter(path => path.endsWith('.css'))
        .map(path => `<link rel="stylesheet" href="${path}" />`)
        .join('\n');
    const javascriptAssets = normalizeAssets(assetsByChunkName.main)
        .filter(path => path.endsWith('.js'))
        .map(path => `<script src="${path}"></script>`)
        .join('\\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" >
    <title>React App</title>
    ${styleAssets}
</head>
<body>
    <noscript>
        You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"><!--SERVER_CONTENT--></div>
    <script>
        // __PRELOADED_STATE__
    </script>
    ${javascriptAssets}
</body>
</html>`;
};

const getIndexFile = function getIndexFile(stats, index) {
    console.log(path.resolve(`${stats.outputPath}/${index}`));
    return path.resolve(`${stats.outputPath}/${index}`);
};

const loadIndexTemplate = async function loadIndexTemplate(compiler, stats, index) {
    if (index === undefined) {
        return generateIndexTemplate(stats);
    }

    return await readFile(compiler.outputFileSystem, getIndexFile(stats, index))
        .catch(err => {
            throw new Error('Unable to get built index file')
        });
};

module.exports = async function createIndexRenderer(compiler, stats, index) {
    let indexTemplate = await loadIndexTemplate(compiler, stats, index);

    return {
        renderString: (htmlContent, preloadedState = {}) => {
            return indexTemplate
                .replace('<!--SERVER_CONTENT-->', htmlContent)
                .replace('// __PRELOADED_STATE__', `window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};`);
        }
    }
};
