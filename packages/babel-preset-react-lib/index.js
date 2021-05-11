'use strict';

const path = require('path');

module.exports = function () {
    return {
        presets: [
            [require('@babel/preset-env').default, {
                useBuiltIns: 'entry',
                corejs: 3,
                modules: false,
                exclude: ['transform-typeof-symbol'],
            }],
            [require('@babel/preset-react').default, {useBuiltIns: true, development: false}],
        ],
        plugins: [
            [require('@babel/plugin-transform-runtime').default, {
                corejs: false,
                helpers: false,
                version: require('@babel/runtime/package.json').version,
                regenerator: true,
                useESModules: false,
                absoluteRuntime: path.dirname(require.resolve('@babel/runtime/package.json')),
            }],
            [require('@babel/plugin-transform-react-constant-elements').default],
            [require('@babel/plugin-syntax-import-meta').default],
            [require('@babel/plugin-proposal-json-strings').default],
            [require('@babel/plugin-proposal-decorators').default, {legacy: true}],
            [require('@babel/plugin-proposal-class-properties').default, {loose: true}],
            [require('@babel/plugin-proposal-private-methods').default, {loose: true}],
            [require('@babel/plugin-proposal-nullish-coalescing-operator').default],
            [require('@babel/plugin-proposal-optional-chaining').default],
        ],
    };
};
