'use strict';

module.exports = function () {
    return {
        presets: [
            [require('@babel/preset-env').default, {useBuiltIns: 'entry', modules: false}],
            [require('@babel/preset-react').default, {development: false, useBuiltIns: true}],
        ],
        plugins: [
            [require('@babel/plugin-transform-runtime').default, {
                helpers: false,
                regenerator: true,
            }],
            [require('@babel/plugin-transform-react-constant-elements').default],
            [require('@babel/plugin-transform-react-display-name').default],
            [require('@babel/plugin-syntax-dynamic-import').default],
            [require('@babel/plugin-syntax-import-meta').default],
            [require('@babel/plugin-proposal-json-strings').default],
            [require('@babel/plugin-proposal-class-properties').default],
            [require('@babel/plugin-proposal-decorators').default, {legacy: true}],
        ],
    };
};
