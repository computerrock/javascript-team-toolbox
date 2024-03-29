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
const imageInlineSizeLimit = parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT || '10000');

/**
 * TODO: Non-functional, needs upgrade
 */
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
                            ],
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
