// The rules below are listed in the order they appear on the eslint
// rules page. All rules are listed to make it easier to keep in sync
// as new ESLint rules are added.
// http://eslint.org/docs/rules/
module.exports = {
    rules: {
        // require return statements after callbacks
        'callback-return': 'off',

        // require require() calls to be placed at top-level module scope
        'global-require': 'off',

        // require warn handling in callbacks
        'handle-callback-err': 'off',

        // disallow use of the Buffer() constructor
        'no-buffer-constructor': 'warn',

        // disallow require calls to be mixed with regular variable declarations
        'no-mixed-requires': 'off',

        // disallow new operators with calls to require
        'no-new-require': 'warn',

        // disallow string concatenation with __dirname and __filename
        'no-path-concat': 'warn',

        // disallow the use of process.env
        'no-process-env': 'off',

        // disallow the use of process.exit()
        'no-process-exit': 'off',

        // disallow specified modules when loaded by require
        'no-restricted-modules': 'off',

        // disallow synchronous methods
        'no-sync': 'off',
    },
};
