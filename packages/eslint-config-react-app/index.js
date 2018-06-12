module.exports = {
    'root': true,
    'parser': 'babel-eslint',
    'env': {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true,
        node: true,
    },
    'extends': [
        '@computerrock/eslint-config-base',
        './rules/react',
        './rules/react-a11y',
    ].map(require.resolve),
    'parserOptions': {
        ecmaVersion: 2017,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true,
        },
    },
    'rules': {},
};
