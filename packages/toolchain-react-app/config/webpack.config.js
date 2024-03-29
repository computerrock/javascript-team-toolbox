'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const postcssNormalize = require('postcss-normalize');
const safePostCssParser = require('postcss-safe-parser');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const InterpolateHtmlPlugin = require('@computerrock/react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('@computerrock/react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleScopePlugin = require('@computerrock/react-dev-utils/ModuleScopePlugin');
const getLocalBEMIdent = require('@computerrock/react-dev-utils/getLocalBEMIdent');
const getLintingPaths = require('@computerrock/react-dev-utils/getLintingPaths');
const getEnvironment = require('./env');
const paths = require('./paths');
const getModuleSourcePaths = require('./getModuleSourcePaths');
// @remove-on-eject-begin
const getCacheIdentifier = require('@computerrock/react-dev-utils/getCacheIdentifier');
// @remove-on-eject-end

// get environment variables to inject into app.
// omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const env = getEnvironment(paths.publicPath.slice(0, -1));

// get source paths
const appSources = getModuleSourcePaths();

// set environment user settings
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const imageInlineSizeLimit = parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT || '10000');
// @remove-on-eject-begin
const isExtendingESLintConfig = process.env.EXTEND_ESLINT === 'true';
const isExtendingStylelintConfig = process.env.EXTEND_STYLELINT === 'true';
// @remove-on-eject-end
const fixESLintErrors = typeof process.env.FIX_ESLINT_ERRORS !== 'undefined'
    ? !(process.env.FIX_ESLINT_ERRORS === 'false') : true;
const fixStylelintErrors = typeof process.env.FIX_STYLELINT_ERRORS !== 'undefined'
    ? process.env.FIX_STYLELINT_ERRORS === 'true' : false;

// production and development configuration
module.exports = function (webpackEnv) {
    const isEnvDevelopment = webpackEnv === 'development';
    const isEnvProduction = webpackEnv === 'production';

    return {
        name: 'client',
        mode: isEnvProduction ? 'production'
            : isEnvDevelopment && 'development',
        bail: isEnvProduction,
        devtool: isEnvProduction ? (shouldUseSourceMap ? 'source-map' : false)
            : isEnvDevelopment && 'cheap-module-source-map',
        target: 'web',
        stats: {
            warnings: false,
            errors: false,
            assets: false,
            modules: false,
            entrypoints: false,
        },
        entry: isEnvProduction ? paths.appIndexJs
            : isEnvDevelopment && [
            require.resolve('webpack-hot-middleware/client') + '?/__what&name=client',
            paths.appIndexJs,
        ],
        output: {
            path: isEnvProduction ? paths.appBuild : '/',
            pathinfo: isEnvDevelopment,
            filename: isEnvProduction ? 'js/[name].[contenthash:8].js'
                : isEnvDevelopment && 'js/index.js',
            chunkFilename: isEnvProduction ? 'js/[name].[contenthash:8].chunk.js'
                : isEnvDevelopment && 'js/[name].chunk.js',
            publicPath: paths.publicPath,
            // point sourcemap entries to original disk location
            devtoolModuleFilenameTemplate: isEnvProduction
                ? info => path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
                : isEnvDevelopment && (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
            hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
            hotUpdateMainFilename: 'hot/[hash].hot-update.json',
        },
        optimization: {
            minimize: isEnvProduction,
            // minify code in production
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        parse: {
                            ecma: 8,
                        },
                        compress: {
                            ecma: 5,
                            warnings: false,
                            comparisons: false,
                            inline: 2,
                        },
                        mangle: {
                            safari10: true,
                        },
                        output: {
                            ecma: 5,
                            comments: false,
                            ascii_only: true,
                        },
                    },
                }),
                new CssMinimizerPlugin({
                    include: appSources,
                    parallel: false, // If a function is passed as a parser, the parallel option must be disabled.
                    minimizerOptions: {
                        processorOptions: {
                            parser: safePostCssParser,
                        },
                    },
                }),
            ],
        },
        resolve: {
            modules: ['node_modules', paths.appNodeModules],
            extensions: ['.js', '.jsx', '.mjs', '.json'],
            alias: {
                'react': path.resolve(paths.appNodeModules, 'react'),
                'react-dom': path.resolve(paths.appNodeModules, 'react-dom'),
                'prop-types': path.resolve(paths.appNodeModules, 'prop-types'),
                'react-native': 'react-native-web',
            },
            fallback: {
                'util': require.resolve('util/'),
            },
            plugins: [
                // Ivan: disable ModuleScopePlugin for now, as there is more
                //   work around it than necessary
                //
                // check that used modules are inside the source scope
                // new ModuleScopePlugin(paths.appSrc, [
                //     paths.appPackageJson,
                //     path.resolve(paths.appNodeModules, '@computerrock/babel-preset-react-app/node_modules/@babel/runtime/regenerator'),
                //     ...paths.reactRefreshEntries,
                // ]),
            ],
        },
        module: {
            strictExportPresence: true,
            rules: [
                {
                    oneOf: [
                        // js/jsx/mjs
                        {
                            test: /\.(js|jsx|mjs)$/,
                            include: appSources,
                            loader: require.resolve('babel-loader'),
                            options: {
                                cacheDirectory: true,
                                cacheCompression: false,
                                compact: isEnvProduction,
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
                                        '@computerrock/toolchain-react-app',
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
                            type: 'asset/inline',
                            use: [
                                require.resolve('svg-transform-loader'),
                                require.resolve('svgo-loader'),
                            ],
                        },
                        // styles
                        {
                            test: /\.(css|scss)$/,
                            use: [
                                isEnvDevelopment && require.resolve('style-loader'),
                                isEnvProduction && {
                                    loader: MiniCssExtractPlugin.loader,
                                    options: paths.publicPath.startsWith('.') ? {publicPath: '../'} : {},
                                },
                                {
                                    loader: require.resolve('css-loader'),
                                    options: {
                                        importLoaders: 4,
                                        sourceMap: isEnvProduction && shouldUseSourceMap,
                                        modules: {
                                            mode: 'local',
                                            auto: /\.module\.(css|scss)$/,
                                            exportGlobals: true,
                                            localIdentName: '[bem]---[contenthash:8]',
                                            getLocalIdent: getLocalBEMIdent,
                                        },
                                    },
                                },
                                require.resolve('svg-transform-loader/encode-query'),
                                {
                                    loader: require.resolve('postcss-loader'),
                                    options: {
                                        sourceMap: isEnvProduction && shouldUseSourceMap,
                                        postcssOptions: {
                                            plugins: [
                                                require('postcss-flexbugs-fixes'),
                                                require('postcss-preset-env')({
                                                    autoprefixer: {
                                                        flexbox: 'no-2009',
                                                        overrideBrowserslist: undefined,
                                                        // https://nicedoc.io/postcss/autoprefixer#does-autoprefixer-polyfill-grid-layout-for-ie
                                                        grid: false,
                                                    },
                                                    browsers: undefined,
                                                    stage: 3,
                                                }),
                                                require('postcss-input-range', {strict: false}),
                                                postcssNormalize(),
                                            ].filter(Boolean)
                                        },
                                    },
                                },
                                {
                                    loader: require.resolve('resolve-url-loader'),
                                    options: {
                                        sourceMap: isEnvProduction && shouldUseSourceMap,
                                        keepQuery: true,
                                        removeCR: true,
                                    },
                                },
                                {
                                    loader: require.resolve('sass-loader'),
                                    options: {
                                        sourceMap: isEnvDevelopment ? shouldUseSourceMap : undefined,
                                        warnRuleAsWarning: true,
                                        additionalData: function (content, loaderContext) {
                                            // if no theme config, just return content
                                            if (!paths.appThemeConfig) return content;

                                            // check if resource is in appSources and is actually a SCSS
                                            const isValidResourcePath = appSources.reduce((isInSourcesPath, appSource) => {
                                                if (!loaderContext.resourcePath) return false;
                                                if (loaderContext.resourcePath && !loaderContext.resourcePath.includes('.scss')) return false;

                                                const relativePath = path.relative(appSource, loaderContext.resourcePath);
                                                isInSourcesPath = isInSourcesPath
                                                    || (relativePath && !relativePath.startsWith('..') && !path.isAbsolute(relativePath));
                                                return isInSourcesPath;
                                            }, false);

                                            // if not valid resource path, just return content
                                            if (!isValidResourcePath) return content;

                                            // import theme config before main code
                                            const lastUseIndex = content.lastIndexOf('@use');
                                            if (lastUseIndex < 0) {
                                                return `@import '${paths.appThemeConfig}';\n${content}`;
                                            }

                                            const newLineIndex = content.indexOf('\n', lastUseIndex) + 1;
                                            return content.slice(0, newLineIndex)
                                                + `\n@import '${paths.appThemeConfig}';\n`
                                                + content.slice(newLineIndex);
                                        },
                                    },
                                },
                            ].filter(Boolean),
                        },
                        // media
                        {
                            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                            type: 'asset',
                            parser: {
                                dataUrlCondition: {
                                  maxSize: imageInlineSizeLimit,
                                }
                            },
                            generator: {
                                filename: 'media/[name].[contenthash:8].[ext]',
                            },
                        },
                        // catch all
                        {
                            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.svg$/],
                            type: 'asset/resource',
                            generator: {
                                filename: 'media/[name].[contenthash:8].[ext]',
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
            // eslint
            new ESLintPlugin({
                extensions: ['js', 'jsx', 'mjs'],
                cache: true,
                formatter: require.resolve('@computerrock/react-dev-utils/eslintFormatter'),
                eslintPath: require.resolve('eslint'),
                resolvePluginsRelativeTo: __dirname,
                fix: fixESLintErrors,
                context: paths.appSrc,
                files: getLintingPaths(paths.appSrc, appSources, '**/*.(js|jsx|mjs)'),
                // @remove-on-eject-begin
                ignore: isExtendingESLintConfig,
                baseConfig: isExtendingESLintConfig ? undefined
                    : {
                        extends: [require.resolve('@computerrock/eslint-config-react-app')],
                        parserOptions: {
                            requireConfigFile: false,
                            babelOptions: {
                                babelrc: false,
                                configFile: false,
                                presets: [require.resolve('@computerrock/babel-preset-react-app')],
                            },
                        }
                    },
                useEslintrc: isExtendingESLintConfig,
                // @remove-on-eject-end
            }),
            // lint styles
            new StyleLintPlugin({
                syntax: 'scss',
                fix: fixStylelintErrors,
                context: paths.appSrc,
                files: getLintingPaths(paths.appSrc, appSources, '**/*.(s(c|a)ss|css)'),
                // @remove-on-eject-begin
                configBasedir: isExtendingStylelintConfig
                    ? paths.ownPath : undefined,
                configFile: isExtendingStylelintConfig
                    ? undefined : path.join(paths.ownPath, '/config/stylelint.config.js'),
                // @remove-on-eject-end
            }),
            // SVG sprite loader
            new SpriteLoaderPlugin(),
            // ignore modules that cause large bundles
            new webpack.IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/,
            }),
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
            new WebpackManifestPlugin({
                fileName: 'asset-manifest.json',
                publicPath: paths.publicPath,
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
                navigateFallback: (paths.publicPath || '') + 'index.html',
                navigateFallbackDenylist: [
                    // Exclude URLs starting with /_, as they're likely an API call
                    new RegExp('^/_'),
                    // Exclude any URLs whose last part seems to be a file extension
                    // as they're likely a resource and not a SPA route.
                    // URLs containing a "?" character won't be blacklisted as they're likely
                    // a route with query params (e.g. auth callbacks).
                    new RegExp('/[^/?]+\\.[^/]+$'),
                ],
                maximumFileSizeToCacheInBytes: 10000000,
            }),
        ].filter(Boolean),
        // TODO tell Webpack to provide empty mocks for imported Node modules not used in the browser
        // node: {
        //     global: false,
        //     __filename: false,
        //     __dirname: false,
        // },
        // turn off performance hints as FileSizeReporter is used instead
        performance: {
            hints: false,
        },
    };
};
