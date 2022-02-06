const path = require('path');
const {babel} = require('@rollup/plugin-babel');
const json = require('@rollup/plugin-json');
const {nodeResolve} = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const {eslint} = require('rollup-plugin-eslint');
const {terser} = require('rollup-plugin-terser');

// production and development configuration
module.exports = function (pkg, options) {
    const basePath = pkg.location;
    const {main, module} = pkg.toJSON();

    return {
        input: path.resolve(basePath, 'src/index.js'),
        output: [
            {
                file: path.join(basePath, main),
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: path.join(basePath, module),
                format: 'es',
                sourcemap: true,
            },
        ],
        external: [
            ...(options.reduce((optionsExternal, optionsObject) => {
                return [
                    ...optionsExternal,
                    ...(optionsObject.external && Array.isArray(optionsObject.external)
                        ? optionsObject.external : []),
                ];
            }, [])),
        ],
        plugins: [
            eslint({
                extensions: ['js', 'jsx', 'mjs'],
                cache: true,
                formatter: require.resolve('@computerrock/react-dev-utils/eslintFormatter'),
                eslintPath: require.resolve('eslint'),
                resolvePluginsRelativeTo: __dirname,
                fix: true,
                ignore: false,
                baseConfig: {
                    extends: [require.resolve('@computerrock/eslint-config-base')],
                    parserOptions: {
                        requireConfigFile: false,
                        babelOptions: {
                            babelrc: false,
                            configFile: false,
                            presets: [require.resolve('@computerrock/babel-preset-react-app')],
                        },
                    },
                },
                useEslintrc: false,
            }),
            babel({
                babelHelpers: 'bundled',
                presets: [require.resolve('@computerrock/babel-preset-react-app')],
                exclude: [
                    path.join(basePath, 'node_modules/**'),
                ],
            }),
            json(),
            nodeResolve(),
            commonjs(),
            (process.env.NODE_ENV === 'production' && terser({
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
            })),
        ],
    };
};
