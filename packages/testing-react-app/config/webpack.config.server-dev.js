'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('@computerrock/react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require('@computerrock/react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('@computerrock/react-dev-utils/ModuleScopePlugin');
const getEnvironment = require('./env');
const paths = require('./paths');

const publicPath = '/';
const publicUrl = '';
const env = getEnvironment(publicUrl);

module.exports = {
    name: 'server',
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    target: 'node',
    entry: [
        require.resolve('./polyfills'),
        paths.appServerJs,
    ],
    output: {
        path: paths.appBuild,
        filename: 'universalAppMiddleware.js',
        publicPath: publicPath,
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
            // eslint
            {
                test: /\.(js|jsx|mjs)$/,
                enforce: 'pre',
                use: [
                    {
                        loader: require.resolve('eslint-loader'),
                        options: {
                            formatter: eslintFormatter,
                            eslintPath: require.resolve('eslint'),
                            fix: true,
                        },
                    },
                ],
                include: paths.appSrc,
            },
            {
                oneOf: [
                    // js/jsx
                    {
                        test: /\.(js|jsx|mjs)$/,
                        include: paths.appSrc,
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
                                    ident: 'postcss',
                                    sourceMap: true,
                                    plugins: () => [
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
                            name: 'media/[name].[hash:8].[ext]',
                        },
                    },
                    // catch all
                    {
                        exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.svg$/],
                        loader: require.resolve('file-loader'),
                        options: {
                            name: 'media/[name].[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        // make environment variables available in application code
        new webpack.DefinePlugin(env.stringified),
        // lint styles
        new StyleLintPlugin({
            syntax: 'scss',
            fix: false,
        }),
        // SVG sprite loader
        new SpriteLoaderPlugin(),
        // enforce case sensitive paths in Webpack requires
        new CaseSensitivePathsPlugin(),
        // on `npm install` rebuild
        new WatchMissingNodeModulesPlugin(paths.appNodeModules),
        // ignore modules that cause large bundles
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    optimization: {
        // when HMR is enabled display relative path of the module
        namedModules: true,
    },
    // tell Webpack to provide empty mocks for imported Node modules not used in the browser
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
    // turn off performance hints during development
    performance: {
        hints: false,
    },
};
