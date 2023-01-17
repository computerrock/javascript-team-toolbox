const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const getLocalBEMIdent = require('@computerrock/react-dev-utils/getLocalBEMIdent');
const postcssNormalize = require('postcss-normalize');
const getModuleSourcePaths = require('./config/getModuleSourcePaths');
const paths = require('./config/paths');

// get source paths
const moduleSourcePaths = getModuleSourcePaths();

module.exports = {
    webpackFinal: async (config, {configType}) => {
        const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
        const imageInlineSizeLimit = parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT || '10000');
        const isEnvProduction = configType === 'PRODUCTION';
        const isEnvDevelopment = configType === 'DEVELOPMENT';

        // filter webpack module rules
        let filteredRules = config.module.rules.filter(({test}) => !(test instanceof RegExp
            && (test.test('.css') || test.test('.scss') || test.test('.svg') || test.test('.mp4'))));
        const storybookAssetsRules = config.module.rules.filter(({test}) => (test instanceof RegExp
            && (test.test('.svg') || test.test('.mp4'))));

        filteredRules = filteredRules.map(moduleRule => {
            const {test, include} = moduleRule;
            if (test.test('.js')
                && (typeof include.test === 'function' ? !include.test('node_modules/acorn-jsx') : true)) {
                return {
                    ...moduleRule,
                    ...(typeof moduleRule.include === 'function' ? {
                        include: (input) => {
                            return moduleRule.include(input)
                                || !!moduleSourcePaths.find(moduleSourcePath => input.includes(moduleSourcePath));
                        },
                    } : {}),
                };
            }

            return moduleRule;
        });

        // TODO temporary fix for unsuccessful resolving of required @computerrock/formation-ui libraries
        config.resolve.alias = {
            ...config.resolve.alias,
            'react-redux': path.resolve(paths.libNodeModules, 'react-redux'),
            'redux-saga': path.resolve(paths.libNodeModules, 'redux-saga'),
        };

        return {
            ...config,
            module: {
                ...config.module,
                rules: [
                    ...filteredRules,
                    {
                        oneOf: [
                            // svg
                            {
                                test: [/\.svg$/],
                                issuer: /\.(js|jsx|mjs)$/,
                                include: moduleSourcePaths,
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
                                include: moduleSourcePaths,
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
                                    isEnvDevelopment && require.resolve('style-loader'),
                                    isEnvProduction && {
                                        loader: MiniCssExtractPlugin.loader,
                                        // options: paths.publicPath.startsWith('.') ? {publicPath: '../'} : {}, // TODO
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
                                                            grid: true,
                                                            overrideBrowserslist: undefined,
                                                        },
                                                        browsers: undefined,
                                                        stage: 3,
                                                    }),
                                                    require('postcss-input-range', {strict: false}),
                                                    postcssNormalize(),
                                                ].filter(Boolean),
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
                                        options: isEnvDevelopment ? {
                                            sourceMap: shouldUseSourceMap,
                                        } : undefined,
                                    },
                                ].filter(Boolean),
                            },
                            // media
                            {
                                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                                include: moduleSourcePaths,
                                loader: require.resolve('url-loader'),
                                options: {
                                    limit: imageInlineSizeLimit,
                                    name: 'media/[name].[contenthash:8].[ext]',
                                },
                            },
                            // catch all
                            {
                                include: moduleSourcePaths,
                                exclude: [/\.(js|jsx|mjs)$/, /\.mdx$/, /\.html$/, /\.json$/, /\.svg$/],
                                loader: require.resolve('file-loader'),
                                options: {
                                    name: 'media/[name].[contenthash:8].[ext]',
                                },
                            },
                            // default storybook assets rules
                            ...storybookAssetsRules,
                        ],
                    },
                ],
            },
            plugins: [
                ...config.plugins,
                // SVG sprite loader
                new SpriteLoaderPlugin(),
                // won't work without MiniCssExtractPlugin.loader in `module.rules`.
                isEnvProduction && new MiniCssExtractPlugin({
                    filename: 'css/[name].[contenthash:8].css',
                    chunkFilename: 'css/[id].[contenthash:8].chunk.css',
                }),
            ].filter(Boolean),
        };
    },
    previewHead: (head) => (`
    ${head}
    <script>
        // https://github.com/pmmmwh/react-refresh-webpack-plugin/issues/176#issuecomment-683150213
        window.$RefreshReg$ = () => {};
        window.$RefreshSig$ = () => () => {};
    </script>
    <style>
      #root {
        overflow: visible !important;
      }
    </style>
  `),
};
