// We use stylelint-webpack-plugin so even warnings are very visible.
// This is why we default severity "WARNING" and avoid "ERROR" level.
module.exports = {
    'defaultSeverity': 'warning',
    'extends': [
        './rules/possible-errors',
        './rules/language-features',
        './rules/style',
        './rules/scss',
        './rules/selector-bem-pattern',
    ].map(require.resolve),
    'rules': {},
};
