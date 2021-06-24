'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('@computerrock/react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require('@computerrock/react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('@computerrock/react-dev-utils/ModuleScopePlugin');
const getLintingPaths = require('@computerrock/react-dev-utils/getLintingPaths');
const getEnvironment = require('./env');
const paths = require('./paths');
const getModuleSourcePaths = require('./getModuleSourcePaths');

// get environment variables to inject into app.
// omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const env = getEnvironment(paths.publicPath.slice(0, -1));

// get source paths
const appSources = getModuleSourcePaths();

module.exports = function (webpackEnv) {
    const isEnvDevelopment = webpackEnv === 'development';
    const isEnvProduction = webpackEnv === 'production';

    return {
        name: 'server',
        mode: isEnvProduction ? 'production'
            : isEnvDevelopment && 'development',
        devtool: 'cheap-module-eval-source-map',
        target: 'node',
        stats: {
            warnings: false,
            errors: false,
            assets: false,
            modules: false,
            entrypoints: false,
        },
        entry: [
            paths.appServerJs,
        ],
        output: {
            path: paths.appBuild,
            filename: 'universalAppMiddleware.js',
            publicPath: paths.publicPath,
            libraryTarget: 'this',
            // point sourcemap entries to original disk location
            devtoolModuleFilenameTemplate: info => path
                .resolve(info.absoluteResourcePath)
                .replace(/\\/g, '/'),
        },
        resolve: {
            modules: ['node_modules'],
            extensions: ['.js', '.jsx', '.json'],
            alias: {
                'react-native': 'react-native-web',
            },
            plugins: [
                // check that used modules are inside the source scope
                new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
            ],
        },
        module: {
            strictExportPresence: true,
            rules: [
                {
                    oneOf: [
                        // js/jsx
                        {
                            test: /\.(js|jsx|mjs)$/,
                            include: appSources,
                            loader: require.resolve('babel-loader'),
                            options: {
                                cacheDirectory: true,
                            },
                        },
                        // svg
                        {
                            test: [/\.svg$/],
                            issuer: /\.(js|jsx|mjs)$/,
                            use: [
                                {
                                    loader: require.resolve('svg-sprite-loader'),
                                    options: {
                                        symbolId: 'symbol-[name]',
                                        extract: true,
                                        spriteFilename: 'media/sprite.[hash:8].svg',
                                        esModule: false,
                                    },
                                },
                                require.resolve('svgo-loader'),
                            ],
                        },
                        {
                            test: [/\.svg$/],
                            issuer: /\.(css|scss)$/,
                            use: [
                                {
                                    loader: require.resolve('svg-url-loader'),
                                    options: {
                                        iesafe: true,
                                    },
                                },
                                require.resolve('svg-transform-loader'),
                                require.resolve('svgo-loader'),
                            ],
                        },
                        // styles
                        {
                            test: /\.(css|scss)$/,
                            use: [
                                {
                                    loader: require.resolve('css-loader'),
                                    options: {
                                        importLoaders: 1,
                                        sourceMap: true,
                                        exportOnlyLocals: true,
                                    },
                                },
                                require.resolve('svg-transform-loader/encode-query'),
                                {
                                    loader: require.resolve('postcss-loader'),
                                    options: {
                                        sourceMap: true,
                                        postcssOptions: {
                                            plugins: [
                                                require('postcss-flexbugs-fixes'),
                                                autoprefixer({
                                                    browsers: [
                                                        '>1%',
                                                        'last 4 versions',
                                                        'Firefox ESR',
                                                        'not ie < 9',
                                                    ],
                                                    flexbox: 'no-2009',
                                                }),
                                            ],
                                        },
                                    },
                                },
                                {
                                    loader: require.resolve('resolve-url-loader'),
                                    options: {
                                        keepQuery: true,
                                        removeCR: true,
                                    },
                                },
                                {
                                    loader: require.resolve('sass-loader'),
                                    options: {
                                        sourceMap: true,
                                        sourceMapContents: true,
                                    },
                                },
                            ],
                        },
                        // media
                        {
                            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                            loader: require.resolve('url-loader'),
                            options: {
                                limit: 10000,
                                name: 'media/[name].[contenthash:8].[ext]',
                            },
                        },
                        // catch all
                        {
                            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.svg$/],
                            loader: require.resolve('file-loader'),
                            options: {
                                name: 'media/[name].[contenthash:8].[ext]',
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            // make environment variables available in application code
            new webpack.DefinePlugin(env.stringified),
            // eslint
            new ESLintPlugin({
                extensions: ['js', 'jsx', 'mjs'],
                formatter: eslintFormatter,
                eslintPath: require.resolve('eslint'),
                fix: true,
                context: paths.appSrc,
                files: getLintingPaths(paths.appSrc, appSources, '**/*.(js|jsx|mjs)'),
            }),
            // lint styles
            new StyleLintPlugin({
                syntax: 'scss',
                fix: false,
                context: paths.appSrc,
                files: getLintingPaths(paths.appSrc, appSources, '**/*.(s(c|a)ss|css)'),
            }),
            // SVG sprite loader
            new SpriteLoaderPlugin(),
            // enforce case sensitive paths in Webpack requires
            new CaseSensitivePathsPlugin(),
            // on `npm install` rebuild
            new WatchMissingNodeModulesPlugin(paths.appNodeModules),
            // ignore modules that cause large bundles
            new webpack.IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/,
            }),
        ],
        optimization: {
            // when HMR is enabled display relative path of the module
            namedModules: true,
        },
        // TODO tell Webpack to provide empty mocks for imported Node modules not used in the browser
        // node: {
        //     dgram: 'empty',
        //     fs: 'empty',
        //     net: 'empty',
        //     tls: 'empty',
        //     child_process: 'empty',
        // },
        // turn off performance hints during development
        performance: {
            hints: false,
        },
    };
};
