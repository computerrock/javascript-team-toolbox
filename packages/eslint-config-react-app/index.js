module.exports = {
    'root': true,
    'parser': '@babel/eslint-parser',
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
        ecmaVersion: 2019,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true,
        },
    },
    'rules': {},
};
