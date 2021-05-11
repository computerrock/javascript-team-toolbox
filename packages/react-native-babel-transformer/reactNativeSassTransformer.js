const path = require('path');
const appRoot = require('app-root-path');
const sass = require('dart-sass');
const css2rn = require('css-to-react-native-transform').default;
const upstreamTransformer = require('metro-react-native-babel-transformer');
const sassImporter = require('node-sass-package-importer');

function renderToCSS({src, filename, options}) {
    const defaultOpts = {
        includePaths: [path.dirname(filename), appRoot],
        indentedSyntax: filename.endsWith('.sass'),
        importer: sassImporter(),
    };

    src = options.sassOptions && options.sassOptions.additionalData
        ? typeof options.sassOptions.additionalData === 'function'
        ? options.sassOptions.additionalData(src, filename)
        : `${options.sassOptions.additionalData}\n${src}`
        : src;

    const opts = options.sassOptions
        ? Object.assign(defaultOpts, options.sassOptions, {data: src})
        : Object.assign(defaultOpts, {data: src});

    const result = sass.renderSync(opts);
    return result.css.toString();
}

function renderToCSSPromise(css) {
    return Promise.resolve(renderToCSS(css));
}

function renderCSSToReactNative(css) {
    return css2rn(css, {parseMediaQueries: true});
}

module.exports.transform = function (src, filename, options) {
    if (typeof src === 'object') {
        // handle RN >= 0.46
        ({src, filename, options} = src);
    }

    if (filename.endsWith('.scss') || filename.endsWith('.sass')) {
        const css = renderToCSS({src, filename, options});
        const cssObject = renderCSSToReactNative(css);
        return upstreamTransformer.transform({
            src: 'module.exports = ' + JSON.stringify(cssObject),
            filename,
            options,
        });
    }
    return upstreamTransformer.transform({src, filename, options});
};

module.exports.renderToCSS = renderToCSSPromise;
