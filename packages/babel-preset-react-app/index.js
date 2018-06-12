'use strict';

module.exports = function () {
    const env = process.env.BABEL_ENV || process.env.NODE_ENV;
    const isEnvDevelopment = env === 'development';
    const isEnvProduction = env === 'production';
    const isEnvTest = env === 'test';

    if (!isEnvDevelopment && !isEnvProduction && !isEnvTest) {
        throw new Error(
            'Using `@computerrock/babel-preset-react-app` requires that you specify `NODE_ENV` or '
            + '`BABEL_ENV` environment variables. Valid values are "development", '
            + '"test", and "production". Instead, received: '
            + JSON.stringify(env)
            + '.',
        );
    }

    if (isEnvDevelopment) {
        return {
            presets: [
                [require('@babel/preset-env').default, {useBuiltIns: 'entry', modules: false}],
                [require('@babel/preset-react').default, {development: true, useBuiltIns: true}],
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
    }

    if (isEnvProduction) {
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
                [require('babel-plugin-transform-react-remove-prop-types').default, {removeImport: true}],
            ],
        };
    }

    if (isEnvTest) {
        return {
            presets: [
                [require('@babel/preset-env').default, {targets: {node: '6.12'}}],
                [require('@babel/preset-react').default, {development: true, useBuiltIns: true}],
                [require('@babel/preset-stage-3').default, {useBuiltIns: true, loose: true}],
            ],
            plugins: [
                [require('@babel/plugin-transform-runtime').default, {
                    helpers: false,
                    polyfill: false,
                    regenerator: true,
                }],
            ],
        };
    }
};
