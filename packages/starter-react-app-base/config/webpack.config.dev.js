'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('@computerrock/react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('@computerrock/react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require('@computerrock/react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('@computerrock/react-dev-utils/ModuleScopePlugin');
const getLocalBEMIdent = require('@computerrock/react-dev-utils/getLocalBEMIdent');
const getEnvironment = require('./env');
const paths = require('./paths');

const publicPath = '/';
const publicUrl = '';
const env = getEnvironment(publicUrl);

module.exports = {
    name: 'client',
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    target: 'web',
    entry: [
        require.resolve('./polyfills'),
        require.resolve('webpack-hot-middleware/client') + '?/__what&name=client',
        paths.appIndexJs,
    ],
    output: {
        path: paths.appBuild,
        filename: 'js/index.js',
        chunkFilename: 'js/[name].chunk.js',
        publicPath: publicPath,
        hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
        hotUpdateMainFilename: 'hot/[hash].hot-update.json',
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
            'react-dom': '@hot-loader/react-dom',
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
                        test: /\.module.(css|scss)$/,
                        // TODO switch to resource.use function to reduce loader config
                        // will be available when issue fixed: https://github.com/webpack/webpack/issues/8952
                        // use: (info) => {
                        //     const isModule = !!info.resource.match(/\.module.(css|scss)$/);
                        //     return [...];
                        // }
                        use: [
                            require.resolve('style-loader'),
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    importLoaders: 4,
                                    sourceMap: true,
                                    modules: true,
                                    localIdentName: '[bem]---[contenthash:8]',
                                    getLocalIdent: getLocalBEMIdent,
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
                                            grid: true,
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
                    {
                        test: /\.(css|scss)$/,
                        use: [
                            require.resolve('style-loader'),
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    importLoaders: 1,
                                    sourceMap: true,
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
                                            grid: true,
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
        // generate index.html file
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
        }),
        // make environment variables available in index.html
        new InterpolateHtmlPlugin(env.raw),
        // make environment variables available in application code
        new webpack.DefinePlugin(env.stringified),
        // lint styles
        new StyleLintPlugin({
            syntax: 'scss',
            fix: false,
        }),
        // SVG sprite loader
        new SpriteLoaderPlugin(),
        // enable HMR
        new webpack.HotModuleReplacementPlugin(),
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
