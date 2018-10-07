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
                [require('@babel/preset-react').default, {useBuiltIns: true, development: true}],
            ],
            plugins: [
                require('react-hot-loader/babel'),
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
    }

    if (isEnvProduction) {

        return {
            presets: [
                [require('@babel/preset-env').default, {useBuiltIns: 'entry', modules: false}],
                [require('@babel/preset-react').default, {useBuiltIns: true, development: false}],
            ],
            plugins: [
                [require('@babel/plugin-transform-runtime').default, {
                    corejs: false,
                    helpers: false,
                    regenerator: false,
                    useESModules: false,
                }],
                [require('@babel/plugin-transform-react-constant-elements').default],
                [require('@babel/plugin-syntax-dynamic-import').default],
                [require('@babel/plugin-syntax-import-meta').default],
                [require('@babel/plugin-proposal-json-strings').default],
                [require('@babel/plugin-proposal-class-properties').default],
                [require('@babel/plugin-proposal-decorators').default, {legacy: true}],
                [require('babel-plugin-transform-react-remove-prop-types').default, {removeImport: true}],
            ],
        };
    }

    if (isEnvTest) {
        return {
            presets: [
                [require('@babel/preset-env').default, {targets: {node: '8.12'}}],
                [require('@babel/preset-react').default, {useBuiltIns: true, development: true}],
            ],
            plugins: [
                [require('@babel/plugin-transform-runtime').default, {
                    corejs: false,
                    helpers: false,
                    regenerator: false,
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
    }
};
