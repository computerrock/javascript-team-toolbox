module.exports = {
    'root': true,
    'parser': 'babel-eslint',
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true,
        'jest': true,
        'node': true,
        'react-native/react-native': true,
    },
    'extends': [
        '@computerrock/eslint-config-base',
        '@computerrock/eslint-config-react-app',
    ].map(require.resolve),
    'plugins': [
        'react',
        'react-native',
        '@react-native-community',
    ],
    'parserOptions': {
        ecmaVersion: 2017,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true,
        },
    },
    'rules': {
        // We use eslint-loader so even warnings are very visible.
        // This is why we mostly use "WARNING" level for potential errors,
        // and avoid "ERROR" level.

        // The rules below are listed in the order they appear on the eslint
        // rules page. All rules are listed to make it easier to keep in sync
        // as new ESLint rules are added.
        // https://eslint.org/docs/rules/
        // https://github.com/Intellicode/eslint-plugin-react-native

        //  Detect StyleSheet rules which are not used in your React components
        'react-native/no-unused-styles': 'warn',

        // Enforce using platform specific filenames when necessary
        'react-native/split-platform-components': 'warn',

        // Detect JSX components with inline styles that contain literal values
        'react-native/no-inline-styles': 'warn',

        // Detect StyleSheet rules and inline styles containing color literals instead of variables
        'react-native/no-color-literals': 'warn',
    },
};
