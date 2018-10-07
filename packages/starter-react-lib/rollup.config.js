import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
    // UMD build
    {
        input: 'src/index.js',
        output: {
            name: 'CRStarterReactLib',
            file: pkg.browser,
            format: 'umd',
        },
        external: [],
        plugins: [
            babel({
                exclude: ['node_modules/**'],
            }),
            resolve(),
            commonjs(),
        ],
    },
    // ES & CJS build
    {
        input: 'src/index.js',
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
        external: [],
        plugins: [
            babel({
                exclude: ['node_modules/**'],
            }),
            resolve(),
            commonjs(),
        ],
    },
];
