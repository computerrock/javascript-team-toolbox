// The rules below are listed in the order they appear on the stylelint
// rules page. All rules are listed to make it easier to keep in sync
// as new rules are added.
// https://github.com/simonsmith/stylelint-selector-bem-pattern
module.exports = {
    plugins: [
        'stylelint-selector-bem-pattern',
    ],
    rules: {
        'plugin/selector-bem-pattern': {
            'preset': 'bem',
        },
    },
};
