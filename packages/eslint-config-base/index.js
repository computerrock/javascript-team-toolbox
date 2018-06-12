module.exports = {
    'parser': 'babel-eslint',
    'env': {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true,
        node: true,
    },
    'extends': [
        './rules/possible-errors',
        './rules/best-practices',
        './rules/variables',
        './rules/node',
        './rules/style',
        './rules/es6',
        './rules/imports',
    ].map(require.resolve),
    'parserOptions': {
        ecmaVersion: 2017,
        sourceType: 'module',
        ecmaFeature: {
            experimentalObjectRestSpread: true,
        },
    },
    'rules': {
        strict: 'off',
    },
};
