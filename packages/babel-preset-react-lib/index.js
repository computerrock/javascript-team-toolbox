'use strict';

module.exports = function () {
    return {
        presets: [
            [require('@babel/preset-env').default, {useBuiltIns: false, modules: false}],
            [require('@babel/preset-react').default, {useBuiltIns: true, development: false}],
        ],
        plugins: [
            [require('@babel/plugin-transform-runtime').default, {
                corejs: false,
                helpers: false,
                regenerator: true,
                useESModules: false,
            }],
            [require('@babel/plugin-transform-react-constant-elements').default],
            [require('@babel/plugin-syntax-dynamic-import').default],
            [require('@babel/plugin-syntax-import-meta').default],
            [require('@babel/plugin-proposal-json-strings').default],
            [require('@babel/plugin-proposal-class-properties').default],
            [require('@babel/plugin-proposal-decorators').default, {legacy: true}],
        ],
    };
};
