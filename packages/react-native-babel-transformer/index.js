// For React Native version 0.59 or later
const upstreamTransformer = require('metro-react-native-babel-transformer');
const svgTransformer = require('react-native-svg-transformer');
const postCSSTransformer = require('react-native-postcss-transformer');
const cssTransformer = require('react-native-css-transformer');
const sassTransformer = require('./reactNativeSassTransformer');

module.exports.transform = function ({src, filename, options}) {
    if (filename.endsWith('.svg')) {
        return svgTransformer.transform({src, filename, options});
    }

    if (filename.endsWith('.css') || filename.endsWith('.pcss')) {
        return cssTransformer
            .renderToCSS({src, filename, options})
            .then(css =>
                postCSSTransformer.transform({src: css, filename, options}),
            );
    }

    if (filename.endsWith('.scss') || filename.endsWith('.sass')) {
        return sassTransformer
            .renderToCSS({src, filename, options})
            .then(css =>
                postCSSTransformer.transform({src: css, filename, options}),
            );
    }

    return upstreamTransformer.transform({src, filename, options});
};
