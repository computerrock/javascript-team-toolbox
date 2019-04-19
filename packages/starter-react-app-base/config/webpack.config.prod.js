'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const InterpolateHtmlPlugin = require('@computerrock/react-dev-utils/InterpolateHtmlPlugin');
const eslintFormatter = require('@computerrock/react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('@computerrock/react-dev-utils/ModuleScopePlugin');
const getEnvironment = require('./env');
const paths = require('./paths');

const publicPath = paths.servedPath;
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const publicUrl = publicPath.slice(0, -1);
const env = getEnvironment(publicUrl);

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
    throw new Error('Production builds must have NODE_ENV=production.');
}

module.exports = {
    mode: 'production',
    bail: true,
    devtool: shouldUseSourceMap ? 'source-map' : false,
    entry: [require.resolve('./polyfills'), paths.appIndexJs],
    output: {
        path: paths.appBuild,
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
        publicPath: publicPath,
        // point sourcemap entries to original disk location
        devtoolModuleFilenameTemplate: info => path
            .relative(paths.appSrc, info.absoluteResourcePath)
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
                        },
                    },
                ],
                include: paths.appSrc,
            },
            {
                oneOf: [
                    // js/jsx
                    {
                        test: /\.(js|jsx)$/,
                        include: paths.appSrc,
                        loader: require.resolve('babel-loader'),
                        options: {
                            compact: true,
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
                        loader: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    importLoaders: 1,
                                    sourceMap: shouldUseSourceMap,
                                },
                            },
                            require.resolve('svg-transform-loader/encode-query'),
                            {
                                loader: require.resolve('postcss-loader'),
                                options: {
                                    ident: 'postcss',
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
                                        require('cssnano')({
                                            preset: 'default',
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
                            require.resolve('sass-loader'),
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
                        loader: require.resolve('file-loader'),
                        exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.svg$/],
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
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        // make environment variables available in index.html
        new InterpolateHtmlPlugin(env.raw),
        // make environment variables available in application code
        new webpack.DefinePlugin(env.stringified),
        // lint styles
        new StyleLintPlugin({syntax: 'scss'}),
        // won't work without MiniCssExtractPlugin.loader in `module.rules`.
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[id].[contenthash:8].chunk.css',
        }),
        // SVG sprite loader
        new SpriteLoaderPlugin(),
        // generate manifest file
        new ManifestPlugin({
            fileName: 'asset-manifest.json',
        }),
        // generate a service worker script for pre-caching HTML & assets
        new SWPrecacheWebpackPlugin({
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'service-worker.js',
            logger(message) {
                if (message.indexOf('Total precache size is') === 0) {
                    return;
                }
                if (message.indexOf('Skipping static resource') === 0) {
                    // no op return;
                }
            },
            minify: true,
            navigateFallback: publicUrl + '/index.html',
            navigateFallbackWhitelist: [/^(?!\/__).*/],
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
        }),
        // ignore modules that cause large bundles
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    optimization: {
        // minify the code
        minimizer: [
            new TerserPlugin({
                sourceMap: shouldUseSourceMap,
                terserOptions: {
                    compress: {
                        warnings: false,
                        comparisons: false,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        comments: false,
                        ascii_only: true,
                    },
                },
            }),
            new OptimizeCSSAssetsPlugin(),
        ],
    },
    // tell Webpack to provide empty mocks for imported Node modules not used in the browser
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
};
