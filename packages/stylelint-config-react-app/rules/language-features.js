// The rules below are listed in the order they appear on the stylelint
// rules page. All rules are listed to make it easier to keep in sync
// as new rules are added.
// https://stylelint.io/user-guide/rules/
module.exports = {
    rules: {
        // Require (where possible) or disallow named colors.
        // 'color-named': 'never',

        // Disallow hex colors.
        // 'color-no-hex': false,

        // Specify a blacklist of disallowed functions.
        // 'function-blacklist': [],

        // Disallow scheme-relative urls.
        // 'function-url-no-scheme-relative': false,

        // Specify a blacklist of disallowed url schemes.
        // 'function-url-scheme-blacklist': [],

        // Specify a whitelist of allowed url schemes.
        // 'function-url-scheme-whitelist': [],

        // Specify a whitelist of allowed functions.
        // 'function-whitelist': [],

        // Limit the number of decimal places allowed in numbers.
        // 'number-max-precision': 6,

        // Specify the minimum number of milliseconds for time values.
        // 'time-min-milliseconds': 150,

        // Specify a blacklist of disallowed units.
        // 'unit-blacklist': [],

        // Specify a whitelist of allowed units.
        // 'unit-whitelist': [],

        // Disallow redundant values in shorthand properties (Autofixable).
        // 'shorthand-property-no-redundant-values': false,

        // Disallow vendor prefixes for values.
        // 'value-no-vendor-prefix': false,

        // Specify a pattern for custom properties.
        // 'custom-property-pattern': '',

        // Specify a blacklist of disallowed properties.
        // 'property-blacklist': [],

        // Disallow vendor prefixes for properties.
        // 'property-no-vendor-prefix': false,

        // Specify a whitelist of allowed properties.
        // 'property-whitelist': [],

        // Disallow longhand properties that can be combined into one shorthand property.
        // 'declaration-block-no-redundant-longhand-properties': false,

        // Disallow !important within declarations.
        // 'declaration-no-important': false,

        // Specify a blacklist of disallowed property and unit pairs within declarations.
        // 'declaration-property-unit-blacklist': {},

        // Specify a whitelist of allowed property and unit pairs within declarations.
        // 'declaration-property-unit-whitelist': {},

        // Specify a blacklist of disallowed property and value pairs within declarations.
        // 'declaration-property-value-blacklist': {},

        // Specify a whitelist of allowed property and value pairs within declarations.
        // 'declaration-property-value-whitelist': {},

        // Limit the number of declaration within single line declaration blocks.
        'declaration-block-single-line-max-declarations': 1,

        // Specify a blacklist of disallowed attribute operators.
        // 'selector-attribute-operator-blacklist': [],

        // Specify a whitelist of allowed attribute operators.
        // 'selector-attribute-operator-whitelist': [],

        // Specify a pattern for class selectors.
        // 'selector-class-pattern': '',

        // Specify a blacklist of disallowed combinators.
        // 'selector-combinator-blacklist': [],

        // Specify a whitelist of allowed combinators.
        // 'selector-combinator-whitelist': [],

        // Specify a pattern for id selectors.
        // 'selector-id-pattern': '',

        // Limit the number of attribute selectors in a selector.
        // 'selector-max-attribute': 3,

        // Limit the number of classes in a selector.
        // 'selector-max-class': 5,

        // Limit the number of combinators in a selector.
        // 'selector-max-combinators': 5,

        // Limit the number of compound selectors in a selector.
        // 'selector-max-compound-selectors': 3,

        // Limit the number of adjacent empty lines within selectors.
        'selector-max-empty-lines': 0,

        // Limit the number of id selectors in a selector.
        // 'selector-max-id': 5,

        // Limit the number of pseudo-classes in a selector.
        // 'selector-max-pseudo-class': 3,

        // Limit the specificity of selectors.
        // 'selector-max-specificity': '5,5,5',

        // Limit the number of type in a selector.
        // 'selector-max-type': 5,

        // Limit the number of universal selectors in a selector.
        // 'selector-max-universal': 1,

        // Specify a pattern for the selectors of rules nested within rules.
        // 'selector-nested-pattern': '^&:(?:hover|focus)$',

        // Disallow qualifying a selector by type.
        // 'selector-no-qualifying-type': false,

        // Disallow vendor prefixes for selectors.
        // 'selector-no-vendor-prefix': false,

        // Specify a blacklist of disallowed pseudo-class selectors.
        // 'selector-pseudo-class-blacklist': [],

        // Specify a whitelist of allowed pseudo-class selectors.
        // 'selector-pseudo-class-whitelist': [],

        // Specify a blacklist of disallowed pseudo-element selectors.
        // 'selector-pseudo-element-blacklist': [],

        // Specify a whitelist of allowed pseudo-element selectors.
        // 'selector-pseudo-element-whitelist': [],

        // Specify a blacklist of disallowed media feature names.
        // 'media-feature-name-blacklist': [],

        // Disallow vendor prefixes for media feature names.
        // 'media-feature-name-no-vendor-prefix': false,

        // Specify a whitelist of allowed media feature name and value pairs.
        // 'media-feature-name-value-whitelist': false,

        // Specify a whitelist of allowed media feature names.
        // 'media-feature-name-whitelist': [],

        // Specify a pattern for custom media query names.
        // 'custom-media-pattern': '',

        // Specify a blacklist of disallowed at-rules.
        // 'at-rule-blacklist': [],

        // Disallow vendor prefixes for at-rules.
        // 'at-rule-no-vendor-prefix': false,

        // Specify a requirelist of properties for an at-rule.
        // 'at-rule-property-requirelist': false,

        // Specify a whitelist of allowed at-rules.
        // 'at-rule-whitelist': [],

        // Specify a blacklist of disallowed words within comments.
        // 'comment-word-blacklist': [],

        // Limit the depth of nesting.
        'max-nesting-depth': 3,

        // Disallow unknown animations.
        'no-unknown-animations': true,
    },
};
