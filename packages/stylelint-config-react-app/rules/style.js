// The rules below are listed in the order they appear on the stylelint
// rules page. All rules are listed to make it easier to keep in sync
// as new rules are added.
// https://stylelint.io/user-guide/rules/
module.exports = {
    rules: {
        // Specify lowercase or uppercase for hex colors (Autofixable).
        'color-hex-case': 'lower',

        // Specify short or long notation for hex colors (Autofixable).
        'color-hex-length': 'short',

        // Specify whether or not quotation marks should be used around font family names.
        'font-family-name-quotes': 'always-unless-keyword',

        // Require numeric or named (where possible) font-weight values.
        // 'font-weight-notation': 'numeric',

        // Require a newline or disallow whitespace after the commas of functions.
        'function-comma-newline-after': 'always-multi-line',

        // Require a newline or disallow whitespace before the commas of functions.
        // 'function-comma-newline-before': 'never-multi-line',

        // Require a single space or disallow whitespace after the commas of functions.
        'function-comma-space-after': 'always-single-line',

        // Require a single space or disallow whitespace before the commas of functions.
        'function-comma-space-before': 'never',

        // Limit the number of adjacent empty lines within functions.
        'function-max-empty-lines': 0,

        // Specify lowercase or uppercase for function names.
        'function-name-case': 'lower',

        // Require a newline or disallow whitespace on the inside of the parentheses of functions.
        'function-parentheses-newline-inside': 'always-multi-line',

        // Require a single space or disallow whitespace on the inside of the parentheses of functions.
        'function-parentheses-space-inside': 'never-single-line',

        // Require or disallow quotes for urls.
        'function-url-quotes': ['always', {except: ['empty']}],

        // Require or disallow whitespace after functions.
        'function-whitespace-after': 'always',

        // Require or disallow a leading zero for fractional numbers less than 1 (Autofixable).
        'number-leading-zero': 'always',

        // Disallow trailing zeros in numbers (Autofixable).
        'number-no-trailing-zeros': true,

        // Specify single or double quotes around strings (Autofixable).
        'string-quotes': 'single',

        // Disallow units for zero lengths (Autofixable).
        'length-zero-no-unit': true,

        // Specify lowercase or uppercase for units.
        'unit-case': 'lower',

        // Specify lowercase or uppercase for keywords values.
        'value-keyword-case': 'lower',

        // Require a newline or disallow whitespace after the commas of value lists.
        'value-list-comma-newline-after': 'always-multi-line',

        // Require a newline or disallow whitespace before the commas of value lists.
        // 'value-list-comma-newline-before': 'never-multi-line',

        // Require a single space or disallow whitespace after the commas of value lists.
        'value-list-comma-space-after': 'always-single-line',

        // Require a single space or disallow whitespace before the commas of value lists.
        'value-list-comma-space-before': 'never',

        // Limit the number of adjacent empty lines within value lists.
        'value-list-max-empty-lines': 0,

        // Require or disallow an empty line before custom properties (Autofixable).
        'custom-property-empty-line-before': [
            'always',
            {
                except: [
                    'after-custom-property',
                    'first-nested',
                ],
                ignore: [
                    'after-comment',
                    'inside-single-line-block',
                ],
            },
        ],

        // Specify lowercase or uppercase for properties.
        'property-case': 'lower',

        // Require a single space or disallow whitespace after the bang of declarations.
        'declaration-bang-space-after': 'never',

        // Require a single space or disallow whitespace before the bang of declarations.
        'declaration-bang-space-before': 'always',

        // Require a newline or disallow whitespace after the colon of declarations.
        'declaration-colon-newline-after': 'always-multi-line',

        // Require a single space or disallow whitespace after the colon of declarations.
        'declaration-colon-space-after': 'always-single-line',

        // Require a single space or disallow whitespace before the colon of declarations.
        'declaration-colon-space-before': 'never',

        // Require or disallow an empty line before declarations (Autofixable).
        'declaration-empty-line-before': [
            'always',
            {
                except: [
                    'after-declaration',
                    'first-nested',
                ],
                ignore: [
                    'after-comment',
                    'inside-single-line-block',
                ],
            },
        ],

        // Require a newline or disallow whitespace after the semicolons of declaration blocks.
        'declaration-block-semicolon-newline-after': 'always-multi-line',

        // Require a newline or disallow whitespace before the semicolons of declaration blocks.
        // 'declaration-block-semicolon-newline-before': 'never-multi-line',

        // Require a single space or disallow whitespace after the semicolons of declaration blocks.
        'declaration-block-semicolon-space-after': 'always-single-line',

        // Require a single space or disallow whitespace before the semicolons of declaration blocks.
        'declaration-block-semicolon-space-before': 'never',

        // Require or disallow a trailing semicolon within declaration blocks.
        'declaration-block-trailing-semicolon': 'always',


        // Require or disallow an empty line before the closing brace of blocks.
        'block-closing-brace-empty-line-before': 'never',

        // Require a newline or disallow whitespace after the closing brace of blocks.
        'block-closing-brace-newline-after': ['always', {'ignoreAtRules': ['if', 'else']}],

        // Require a newline or disallow whitespace before the closing brace of blocks.
        'block-closing-brace-newline-before': 'always-multi-line',

        // Require a single space or disallow whitespace after the closing brace of blocks.
        'block-closing-brace-space-after': 'always-single-line',

        // Require a single space or disallow whitespace before the closing brace of blocks.
        'block-closing-brace-space-before': 'always-single-line',

        // Require a newline after the opening brace of blocks.
        'block-opening-brace-newline-after': 'always-multi-line',

        // Require a newline or disallow whitespace before the opening brace of blocks.
        // 'block-opening-brace-newline-before': 'always',

        // Require a single space or disallow whitespace after the opening brace of blocks.
        'block-opening-brace-space-after': 'always-single-line',

        // Require a single space or disallow whitespace before the opening brace of blocks.
        'block-opening-brace-space-before': 'always',

        // Require a single space or disallow whitespace on the inside of the brackets within attribute selectors.
        'selector-attribute-brackets-space-inside': 'never',

        // Require a single space or disallow whitespace after operators within attribute selectors.
        'selector-attribute-operator-space-after': 'never',

        // Require a single space or disallow whitespace before operators within attribute selectors.
        'selector-attribute-operator-space-before': 'never',

        // Require or disallow quotes for attribute values.
        'selector-attribute-quotes': 'always',

        // Require a single space or disallow whitespace after the combinators of selectors.
        'selector-combinator-space-after': 'always',

        // Require a single space or disallow whitespace before the combinators of selectors.
        'selector-combinator-space-before': 'always',

        // Disallow non-space characters for descendant combinators of selectors.
        'selector-descendant-combinator-no-non-space': true,

        // Specify lowercase or uppercase for pseudo-class selectors.
        'selector-pseudo-class-case': 'lower',

        // Require a single space or disallow whitespace on the inside of the parentheses within pseudo-class selectors.
        'selector-pseudo-class-parentheses-space-inside': 'never',

        // Specify lowercase or uppercase for pseudo-element selectors.
        'selector-pseudo-element-case': 'lower',

        // Specify single or double colon notation for applicable pseudo-elements.
        'selector-pseudo-element-colon-notation': 'double',

        // Specify lowercase or uppercase for type selector.
        'selector-type-case': 'lower',

        // Require a newline or disallow whitespace after the commas of selector lists.
        'selector-list-comma-newline-after': 'always',

        // Require a newline or disallow whitespace before the commas of selector lists.
        // 'selector-list-comma-newline-before': 'never-multi-line',

        // Require a single space or disallow whitespace after the commas of selector lists.
        // 'selector-list-comma-space-after': 'always-single-line',

        // Require a single space or disallow whitespace before the commas of selector lists.
        'selector-list-comma-space-before': 'never',

        // Require or disallow an empty line before rules (Autofixable).
        'rule-empty-line-before': [
            'always-multi-line',
            {
                except: ['first-nested'],
                ignore: ['after-comment'],
            },
        ],

        // Require a single space or disallow whitespace after the colon in media features.
        'media-feature-colon-space-after': 'always',

        // Require a single space or disallow whitespace before the colon in media features.
        'media-feature-colon-space-before': 'never',

        // Specify lowercase or uppercase for media feature names.
        'media-feature-name-case': 'lower',

        // Require a single space or disallow whitespace on the inside of the parentheses within media features.
        'media-feature-parentheses-space-inside': 'never',

        // Require a single space or disallow whitespace after the range operator in media features.
        'media-feature-range-operator-space-after': 'always',

        // Require a single space or disallow whitespace before the range operator in media features.
        'media-feature-range-operator-space-before': 'always',

        // Require a newline or disallow whitespace after the commas of media query lists.
        'media-query-list-comma-newline-after': 'always-multi-line',

        // Require a newline or disallow whitespace before the commas of media query lists.
        // 'media-query-list-comma-newline-before': 'never-multi-line',

        // Require a single space or disallow whitespace after the commas of media query lists.
        'media-query-list-comma-space-after': 'always-single-line',

        // Require a single space or disallow whitespace before the commas of media query` lists.
        'media-query-list-comma-space-before': 'never',

        // Require or disallow an empty line before at-rules (Autofixable).
        'at-rule-empty-line-before': [
            'always',
            {
                'except': [
                    'blockless-after-same-name-blockless',
                    'first-nested',
                ],
                'ignore': ['after-comment'],
                'ignoreAtRules': ['else'],
            },
        ],

        // Specify lowercase or uppercase for at-rules names (Autofixable).
        'at-rule-name-case': 'lower',

        // Require a newline after at-rule names.
        // 'at-rule-name-newline-after': 'always-multi-line',

        // Require a single space after at-rule names.
        'at-rule-name-space-after': 'always-single-line',

        // Require a newline after the semicolon of at-rules.
        'at-rule-semicolon-newline-after': 'always',

        // Require a single space or disallow whitespace before the semicolons of at rules.
        'at-rule-semicolon-space-before': 'never',

        // Require or disallow an empty line before comments (Autofixable).
        'comment-empty-line-before': [
            'always',
            {
                except: ['first-nested'],
                ignore: ['stylelint-commands'],
            },
        ],

        // Require or disallow whitespace on the inside of comment markers.
        'comment-whitespace-inside': 'always',

        // Specify indentation (Autofixable).
        'indentation': [4],

        // Specify unix or windows linebreaks (Autofixable)
        // 'linebreaks': ['unix'],

        // Limit the number of adjacent empty lines.
        'max-empty-lines': 1,

        // Limit the length of a line.
        'max-line-length': 120,

        // Disallow end-of-line whitespace.
        'no-eol-whitespace': true,

        // Disallow missing end-of-source newlines (Autofixable).
        'no-missing-end-of-source-newline': true,

        // Disallow empty first lines (Autofixable).
        'no-empty-first-line': true,

        // Require or disallow Unicode BOM.
        // 'unicode-bom': ['never'],
    },
};
