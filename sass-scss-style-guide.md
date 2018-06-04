# Sass/SCSS Style Guide

!Work in progress!

Purpose of this document is to make you familiar with style of writing Sass/SCSS code within Computer Rock.

For validating best code practices, avoiding possible errors and checking code style we use `stylelint`. Configuration for 
`stylelint` is centrally maintained and published from next package (sourcecode is in `./packages` folder):

* @computerrock/stylelint-config-react-app

We use `stylelint-webpack-plugin` in Webpack so even warnings are very visible. This is why we set default severity to
"WARNING". Steps for configuring project to use `stylelint-webpack-plugin` and configuration package are described 
in [`Project setup and contribution guide`](./project-setup-and-contribution-guide.md).

Main focus of this document  are stylistic choices we made, so not all activated stylelint rules are mentioned, but just 
those related to style. Style is based on existing projects and it mostly doesn't go against IDE's used.

For IDE code style configuration manuals please check  `./other-docs/` folder in this project.


### Possible errors

✕ Examples of *incorrect* code:
```scss

``` 
 
✔ Examples of *correct* code:
```scss

``` 

// Disallow invalid hex colors.
'color-no-invalid-hex': true,

// Disallow duplicate font family names.
'font-family-no-duplicate-names': true,

// Disallow missing generic families in lists of font family names.
'font-family-no-missing-generic-family-keyword': true,

// Disallow an unspaced operator within calc functions.
'function-calc-no-unspaced-operator': true,

// Disallow direction values in linear-gradient() calls that are not valid according to the standard syntax.
'function-linear-gradient-no-nonstandard-direction': true,

// Disallow (unescaped) newlines in strings.
'string-no-newline': true,

// Disallow unknown units.
'unit-no-unknown': true,

// Disallow unknown properties.
'property-no-unknown': true,

// Disallow !important within keyframe declarations.
'keyframe-declaration-no-important': true,

// Disallow duplicate properties within declaration blocks.
'declaration-block-no-duplicate-properties': [
    true,
    {
        ignore: ['consecutive-duplicates-with-different-values']
    }
],

// Disallow shorthand properties that override related longhand properties within declaration blocks.
'declaration-block-no-shorthand-property-overrides': true,

// Disallow empty blocks.
'block-no-empty': true,

// Disallow unknown pseudo-class selectors.
'selector-pseudo-class-no-unknown': true,

// Disallow unknown pseudo-element selectors.
'selector-pseudo-element-no-unknown': true,

// Disallow unknown type selectors.
'selector-type-no-unknown': true,

// Disallow unknown media feature names.
'media-feature-name-no-unknown': true,

// Disallow empty comments.
'comment-no-empty': true,

// Disallow selectors of lower specificity from coming after overriding selectors of higher specificity.
'no-descending-specificity': true,

// Disallow duplicate @import rules within a stylesheet.
'no-duplicate-at-import-rules': true,

// Disallow duplicate selectors.
'no-duplicate-selectors': true,

// Disallow empty sources.
'no-empty-source': true,

// Disallow extra semicolons.
'no-extra-semicolons': true,

// Disallow double-slash comments (//...) which are not supported by CSS.
'no-invalid-double-slash-comments': true,


### Language features

// Limit the number of declaration within single line declaration blocks.
'declaration-block-single-line-max-declarations': 1,

// Limit the number of adjacent empty lines within selectors.
'selector-max-empty-lines': 0,

// Limit the depth of nesting.
'max-nesting-depth': 3,

// Disallow unknown animations.
'no-unknown-animations': true,
        

### Style
// Specify lowercase or uppercase for hex colors (Autofixable).
'color-hex-case': 'lower',

// Specify short or long notation for hex colors (Autofixable).
'color-hex-length': 'short',

// Specify whether or not quotation marks should be used around font family names.
'font-family-name-quotes': 'always-unless-keyword',

// Require a newline or disallow whitespace after the commas of functions.
'function-comma-newline-after': 'always-multi-line',

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

// Limit the number of adjacent empty lines.
'max-empty-lines': 1,

// Limit the length of a line.
'max-line-length': 120,

// Disallow end-of-line whitespace.
'no-eol-whitespace': true,

// Disallow missing end-of-source newlines (Autofixable).
'no-missing-end-of-source-newline': true,
        

### Sass/SCSS

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
'scss/at-function-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',

// Require or disallow a newline after the closing brace of @if statements (Autofixable).
'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',

// Require a single space or disallow whitespace after the closing brace of @if statements (Autofixable).
'scss/at-if-closing-brace-space-after': 'always-intermediate',

// Disallow leading underscore in partial names in @import.
'scss/at-import-no-partial-leading-underscore': true,

// Specify blacklist of disallowed file extensions for partial names in @import commands.
'scss/at-import-partial-extension-blacklist': ['scss', 'less'],

// Require or disallow parentheses in argumentless @mixin calls.
'scss/at-mixin-argumentless-call-parentheses': 'always',

// Require named parameters in at-mixin call rule.
'scss/at-mixin-named-arguments': 'never',

// Require or disallow a space before @mixin parentheses (Autofixable).
'scss/at-mixin-parentheses-space-before': 'never',

// Specify a pattern for Sass/SCSS-like mixin names.
'scss/at-mixin-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',

// Disallow unknown at-rules. Should be used instead of stylelint's at-rule-no-unknown.
'scss/at-rule-no-unknown': true,

// Require a newline after the colon in $-variable declarations (Autofixable).
'scss/dollar-variable-colon-newline-after': 'always-multi-line',

// Require or disallow whitespace after the colon in $-variable declarations (Autofixable).
'scss/dollar-variable-colon-space-after': 'always-single-line',

// Require a single space or disallow whitespace before the colon in $-variable declarations (Autofixable).
'scss/dollar-variable-colon-space-before': 'never',

// Disallow Sass variables that are used without interpolation with CSS features that use custom identifiers.
'scss/dollar-variable-no-missing-interpolation': true,

// Specify a pattern for Sass-like variables.
'scss/dollar-variable-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',

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
'scss/double-slash-comment-inline': 'never',

// Require or disallow whitespace after the // in //-comments
'scss/double-slash-comment-whitespace-inside': 'always',

// Require or disallow properties with - in their names to be in a form of a nested group.
'scss/declaration-nested-properties': 'never',

// Disallow linebreaks after Sass operators.
'scss/operator-no-newline-after': true,

// Disallow unspaced operators in Sass operations.
'scss/operator-no-unspaced': true,

// Disallow redundant nesting selectors (&).
'scss/selector-no-redundant-nesting-selector': true,
        
### BEM
