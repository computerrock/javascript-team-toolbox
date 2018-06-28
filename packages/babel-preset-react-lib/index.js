'use strict';

module.exports = function () {
    return {
        presets: [
            [require('@babel/preset-env').default, {useBuiltIns: 'entry', modules: false}],
            [require('@babel/preset-react').default, {development: false, useBuiltIns: true}],
            [require('@babel/preset-stage-3').default, {useBuiltIns: true, loose: true}],
        ],
        plugins: [
            [require('@babel/plugin-transform-runtime').default, {
                helpers: false,
                polyfill: false,
                regenerator: true,
            }],
            [require('@babel/plugin-proposal-decorators').default, {legacy: true}],
        ],
    };
};
