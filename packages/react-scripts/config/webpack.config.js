'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const InterpolateHtmlPlugin = require('@computerrock/react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('@computerrock/react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require('@computerrock/react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('@computerrock/react-dev-utils/ModuleScopePlugin');
const getLocalBEMIdent = require('@computerrock/react-dev-utils/getLocalBEMIdent');
const getEnvironment = require('./env');
const paths = require('./paths');
// @remove-on-eject-begin
const getCacheIdentifier = require('@computerrock/react-dev-utils/getCacheIdentifier');
// @remove-on-eject-end

const publicPath = '/';
const publicUrl = '';
const env = getEnvironment(publicUrl);
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

// production and development configuration
module.exports = function (webpackEnv) {
    const isEnvDevelopment = webpackEnv === 'development';
    const isEnvProduction = webpackEnv === 'production';

    // common function to get style loaders
    // TODO resource.use callback function is better way to reduce loader config, will be available when
    //  issue is fixed: https://github.com/webpack/webpack/issues/8952 in Webpack 5 (?)
    // use: (info) => {
    //     const isModule = !!info.resource.match(/\.module.(css|scss)$/);
    //     return [...];
    // }
    const getStyleLoaders = (cssLoaderOptions) => {
        return [
            isEnvDevelopment && require.resolve('style-loader'),
            isEnvProduction && MiniCssExtractPlugin.loader,
            {
                loader: require.resolve('css-loader'),
                options: cssLoaderOptions,
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
                            flexbox: 'no-2009',
                            grid: true,
                        }),
                        isEnvProduction && require('cssnano')({
                            preset: 'default',
                        }),
                    ].filter(Boolean),
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
                options: isEnvDevelopment ? {
                    sourceMap: true,
                    sourceMapContents: true,
                } : undefined,
            },
        ].filter(Boolean);
    };

    return {
        name: 'client',
        mode: isEnvProduction ? 'production'
            : isEnvDevelopment && 'development',
        bail: isEnvProduction,
        devtool: isEnvProduction ? (shouldUseSourceMap ? 'source-map' : false)
            : isEnvDevelopment && 'cheap-module-source-map',
        target: 'web',
        entry: isEnvProduction ? paths.appIndexJs
            : isEnvDevelopment && [
            require.resolve('webpack-hot-middleware/client') + '?/__what&name=client',
            paths.appIndexJs,
        ],
        output: {
            path: isEnvProduction ? paths.appBuild : undefined,
            pathinfo: isEnvDevelopment,
            filename: isEnvProduction ? 'js/[name].[chunkhash:8].js'
                : isEnvDevelopment && 'js/index.js',
            chunkFilename: isEnvProduction ? 'js/[name].[chunkhash:8].chunk.js'
                : isEnvDevelopment && 'js/[name].chunk.js',
            publicPath: publicPath,
            // point sourcemap entries to original disk location
            devtoolModuleFilenameTemplate: isEnvProduction
                ? info => path
                    .relative(paths.appSrc, info.absoluteResourcePath)
                    .replace(/\\/g, '/')
                : isEnvDevelopment && (info => path
                .resolve(info.absoluteResourcePath)
                .replace(/\\/g, '/')),
            hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
            hotUpdateMainFilename: 'hot/[hash].hot-update.json',
        },
        optimization: {
            minimize: isEnvProduction,
            // minify code in production
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
            // when HMR is enabled display relative path of the module
            namedModules: true,
        },
        resolve: {
            modules: ['node_modules', paths.appNodeModules],
            extensions: ['.js', '.jsx', '.mjs', '.json'],
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
                        // js/jsx/mjs
                        {
                            test: /\.(js|jsx|mjs)$/,
                            include: paths.appSrc,
                            loader: require.resolve('babel-loader'),
                            options: {
                                cacheDirectory: true,
                                // @remove-on-eject-begin
                                babelrc: false,
                                configFile: false,
                                presets: [require.resolve('@computerrock/babel-preset-react-app')],
                                cacheIdentifier: getCacheIdentifier(
                                    isEnvProduction ? 'production'
                                        : isEnvDevelopment && 'development',
                                    [
                                        '@computerrock/babel-preset-react-app',
                                        '@computerrock/react-dev-utils',
                                        '@computerrock/react-scripts',
                                    ],
                                ),
                                // @remove-on-eject-end
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
                            test: /\.module\.(css|scss)$/,
                            use: getStyleLoaders({
                                importLoaders: 4,
                                sourceMap: isEnvProduction && shouldUseSourceMap,
                                modules: true,
                                localIdentName: '[bem]---[contenthash:8]',
                                getLocalIdent: getLocalBEMIdent,
                            }),
                        },
                        {
                            test: /\.(css|scss)$/,
                            use: getStyleLoaders({
                                importLoaders: 1,
                                sourceMap: isEnvProduction && shouldUseSourceMap,
                            }),
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
            new HtmlWebpackPlugin(
                Object.assign(
                    {},
                    {
                        inject: true,
                        template: paths.appHtml,
                    },
                    isEnvProduction
                        ? {
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
                        }
                        : undefined,
                ),
            ),
            // make environment variables available in index.html
            new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
            // make environment variables available in application code
            new webpack.DefinePlugin(env.stringified),
            // lint styles
            new StyleLintPlugin({
                syntax: 'scss',
                fix: false,
                // @remove-on-eject-begin
                configBasedir: paths.ownPath,
                // @remove-on-eject-end
            }),
            // SVG sprite loader
            new SpriteLoaderPlugin(),
            // ignore modules that cause large bundles
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            // enable HMR (CSS only)
            isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
            // enable React refresh
            isEnvDevelopment && new ReactRefreshWebpackPlugin(),
            // enforce case sensitive paths in Webpack requires
            isEnvDevelopment && new CaseSensitivePathsPlugin(),
            // on `npm install` rebuild
            isEnvDevelopment && new WatchMissingNodeModulesPlugin(paths.appNodeModules),
            // won't work without MiniCssExtractPlugin.loader in `module.rules`.
            isEnvProduction && new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[id].[contenthash:8].chunk.css',
            }),
            // generate manifest file
            new ManifestPlugin({
                fileName: 'asset-manifest.json',
                publicPath: paths.publicUrl,
                generate: (seed, files, entrypoints) => {
                    const manifestFiles = files.reduce((manifest, file) => {
                        manifest[file.name] = file.path;
                        return manifest;
                    }, seed);
                    const entrypointFiles = entrypoints.main.filter(
                        fileName => !fileName.endsWith('.map')
                    );

                    return {
                        files: manifestFiles,
                        entrypoints: entrypointFiles,
                    };
                },
            }),
            // generate a service worker script for pre-caching HTML & assets
            isEnvProduction && new WorkboxWebpackPlugin.GenerateSW({
                clientsClaim: true,
                exclude: [/\.map$/, /asset-manifest\.json$/],
                navigateFallback: (paths.publicUrl || '') + 'index.html',
                navigateFallbackDenylist: [
                    // Exclude URLs starting with /_, as they're likely an API call
                    new RegExp('^/_'),
                    // Exclude any URLs whose last part seems to be a file extension
                    // as they're likely a resource and not a SPA route.
                    // URLs containing a "?" character won't be blacklisted as they're likely
                    // a route with query params (e.g. auth callbacks).
                    new RegExp('/[^/?]+\\.[^/]+$'),
                ],
            }),
        ].filter(Boolean),
        // tell Webpack to provide empty mocks for imported Node modules not used in the browser
        node: {
            dgram: 'empty',
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty',
        },
        // turn off performance hints as FileSizeReporter is used instead
        performance: {
            hints: false,
        },
    };
};
