import {eslint} from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import terser from 'rollup-plugin-terser';
import pkg from './package.json';

export default [
    // UMD build
    {
        input: 'src/index.js',
        external: [],
        output: {
            name: 'CRStarterReactLib',
            file: pkg.browser,
            format: 'umd',
        },
        plugins: [
            eslint({
                fix: true,
            }),
            babel({
                exclude: ['node_modules/**'],
            }),
            json(),
            resolve(),
            commonjs(),
        ],
    },
    // ES & CJS build
    {
        input: 'src/index.js',
        external: [],
        output: [
            {
                file: pkg.main,
                format: 'cjs',
                sourceMap: true,
            },
            {
                file: pkg.module,
                format: 'es',
                sourceMap: true,
            },
        ],
        plugins: [
            eslint({
                fix: true,
            }),
            babel({
                exclude: ['node_modules/**'],
            }),
            json(),
            resolve(),
            commonjs(),
            (process.env.NODE_ENV === 'production' && terser({
                sourceMap: true,
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
            })),
        ],
    },
];
