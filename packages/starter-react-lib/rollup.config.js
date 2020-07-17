import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {eslint} from 'rollup-plugin-eslint';
import postcss from 'rollup-plugin-postcss'
import {terser} from 'rollup-plugin-terser';
import postcssPresetEnv from 'postcss-preset-env';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import pkg from './package.json';

export default [
    // ES & CJS build
    {
        input: 'src/index.js',
        external: [
            '@computerrock/react-app-polyfill',
        ],
        output: [
            {
                file: pkg.main,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: pkg.module,
                format: 'es',
                sourcemap: true,
            },
        ],
        plugins: [
            postcss({
                plugins: [
                    postcssFlexbugsFixes(),
                    postcssPresetEnv({
                        autoprefixer: {
                            flexbox: 'no-2009',
                            grid: true,
                        },
                        stage: 3,
                    })
                ],
            }),
            eslint({
                fix: true,
            }),
            babel({
                babelHelpers: 'bundled',
                exclude: ['node_modules/**'],
            }),
            json(),
            resolve(),
            commonjs(),
            (process.env.NODE_ENV === 'production' && terser({
                sourceMap: true,
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
            })),
        ],
    },
];
