// The rules below are listed in the order they appear on the stylelint
// rules page. All rules are listed to make it easier to keep in sync
// as new rules are added.
// https://github.com/kristerkari/stylelint-scss
module.exports = {
    plugins: [
        'stylelint-scss',
    ],
    rules: {
        // Check for situations where users have done a loop using map-keys and grabbed the value for that key inside of the loop.
        // 'scss/at-each-key-value-single-line': true,

        // Require or disallow a newline after the closing brace of @else statements (Autofixable).
        'scss/at-else-closing-brace-newline-after': 'always-last-in-chain',

        // Require a single space or disallow whitespace after the closing brace of @else statements (Autofixable).
        'scss/at-else-closing-brace-space-after': 'always-intermediate',

        // Require an empty line or disallow empty lines before @-else (Autofixable).
        'scss/at-else-empty-line-before': 'never',

        // Require or disallow a space before @else if parentheses (Autofixable).
        'scss/at-else-if-parentheses-space-before': 'always',

        // Disallow at-extends (@extend) with missing placeholders.
        'scss/at-extend-no-missing-placeholder': true,

        // Require named parameters in SCSS function call rule.
        'scss/at-function-named-arguments': 'never',

        // Require or disallow a space before @function parentheses (Autofixable).
        'scss/at-function-parentheses-space-before': 'never',

        // Specify a pattern for Sass/SCSS-like function names.
        'scss/at-function-pattern': '^(-|_)*([a-z][a-z0-9]*)(-[a-z0-9]+)*$',

        // Require or disallow a newline after the closing brace of @if statements (Autofixable).
        'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',

        // Require a single space or disallow whitespace after the closing brace of @if statements (Autofixable).
        'scss/at-if-closing-brace-space-after': 'always-intermediate',

        // Disallow null in @if statements.
        // 'scss/at-if-no-null': true,

        // Disallow leading underscore in partial names in @import.
        'scss/at-import-no-partial-leading-underscore': true,

        // Specify blacklist of disallowed file extensions for partial names in @import commands.
        'scss/at-import-partial-extension-blacklist': ['scss', 'less'],

        // Specify whitelist of allowed file extensions for partial names in @import commands.
        // 'scss/at-import-partial-extension-whitelist': [],

        // Require or disallow parentheses in argumentless @mixin calls.
        'scss/at-mixin-argumentless-call-parentheses': 'always',

        // Require named parameters in at-mixin call rule.
        'scss/at-mixin-named-arguments': 'never',

        // Require or disallow a space before @mixin parentheses (Autofixable).
        'scss/at-mixin-parentheses-space-before': 'never',

        // Specify a pattern for Sass/SCSS-like mixin names.
        'scss/at-mixin-pattern': '^(-|_)*([a-z][a-z0-9]*)(-[a-z0-9]+)*$',

        // Disallow parentheses in conditional @ rules (if, elsif, while).
        // 'scss/at-rule-conditional-no-parentheses': true,

        // Disallow unknown at-rules. Should be used instead of stylelint's at-rule-no-unknown.
        'scss/at-rule-no-unknown': true,

        // Require a newline after the colon in $-variable declarations (Autofixable).
        'scss/dollar-variable-colon-newline-after': 'always-multi-line',

        // Require or disallow whitespace after the colon in $-variable declarations (Autofixable).
        'scss/dollar-variable-colon-space-after': 'always-single-line',

        // Require a single space or disallow whitespace before the colon in $-variable declarations (Autofixable).
        'scss/dollar-variable-colon-space-before': 'never',

        // Require !default flag for $-variable declarations.
        // 'scss/dollar-variable-default': true,

        // Require a single empty line or disallow empty lines before $-variable declarations (Autofixable).
        // 'scss/dollar-variable-empty-line-before': 'never',

        // Disallow Sass variables that are used without interpolation with CSS features that use custom identifiers.
        'scss/dollar-variable-no-missing-interpolation': true,

        // Specify a pattern for Sass-like variables.
        'scss/dollar-variable-pattern': '^(-|_)*([a-z][a-z0-9]*)(-[a-z0-9]+)*$',

        // Specify a pattern for %-placeholders.
        'scss/percent-placeholder-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',

        // Require or disallow an empty line before //-comments (Autofixable).
        'scss/double-slash-comment-empty-line-before': [
            'always',
            {
                except: ['first-nested'],
                ignore: ['between-comments', 'stylelint-commands'],
            },
        ],

        // Require or disallow //-comments to be inline comments.
        // 'scss/double-slash-comment-inline': 'never',

        // Require or disallow whitespace after the // in //-comments
        'scss/double-slash-comment-whitespace-inside': 'always',

        // Disallow /*-comments.
        // 'scss/comment-no-loud': true,

        // Require or disallow properties with - in their names to be in a form of a nested group.
        'scss/declaration-nested-properties': 'never',

        // Disallow nested properties of the same "namespace" be divided into multiple groups.
        // 'scss/declaration-nested-properties-no-divided-groups': true,

        // Disallow non-numeric values when interpolating a value with a unit.
        // 'scss/dimension-no-non-numeric-values': true,

        // Encourage the use of the scale-color function over regular color functions.
        // 'scss/function-color-relative': true,

        // Disallow quoted strings inside the quote function (Autofixable).
        // 'scss/function-quote-no-quoted-strings-inside': true,

        // Disallow unquoted strings inside the unquote function (Autofixable).
        // 'scss/function-unquote-no-unquoted-strings-inside': true,

        // Require quoted keys in Sass maps.
        // 'scss/map-keys-quotes': true,

        // Require a media feature value be a $-variable or disallow $-variables in media feature values.
        // 'scss/media-feature-value-dollar-variable': 'always',

        // Disallow linebreaks after Sass operators.
        'scss/operator-no-newline-after': true,

        // Disallow linebreaks before Sass operators.
        // 'scss/operator-no-newline-before': true,

        // Disallow unspaced operators in Sass operations.
        'scss/operator-no-unspaced': true,

        // Disallow non-CSS @imports in partial files.
        // 'scss/partial-no-import': true,

        // Require or disallow nesting of combinators in selectors.
        // 'scss/selector-nest-combinators': ['always'],

        // Disallow union class names with the parent selector (&).
        // 'scss/selector-no-union-class-name': ['never'],

        // Disallow redundant nesting selectors (&).
        // 'scss/selector-no-redundant-nesting-selector': true,

        // Disallow dollar variables within a stylesheet.
        // 'scss/no-dollar-variables': true,

        // Disallow duplicate dollar variables within a stylesheet.
        // 'scss/no-duplicate-dollar-variables': true,

        // Disallow duplicate mixins within a stylesheet.
        'scss/no-duplicate-mixins': true,
    },
};
