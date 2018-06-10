# Sass/SCSS Style Guide

!Work in progress!

Purpose of this document is to make you familiar with style of writing Sass/SCSS code within Computer Rock.

For validating best code practices, avoiding possible errors and checking code style we use `stylelint`. Configuration 
for `stylelint` is centrally maintained and published from next package (sourcecode is in [`./packages`](./packages) 
folder):

* @computerrock/stylelint-config-react-app

We use `stylelint-webpack-plugin` in Webpack so even warnings are very visible. This is why we set default severity to
"WARNING". Steps for configuring project to use `stylelint-webpack-plugin` and configuration package are described 
in [`Project setup`](./project-setup.md) document.

Main focus of this document  are stylistic choices we made. So not all activated stylelint rules are mentioned, but just 
those related to style. Style is based on existing projects and it mostly doesn't go against IDE's used.

For IDE code style configuration manuals please check  [`./other-docs/`](./other-docs) folder in this project.


### 1. Properties & Values

#### 1.1

* Use single line declaration blocks only when they contain one declaration. (`declaration-block-single-line-max-declarations: 1`,
`declaration-block-semicolon-space-after: always-single-line`, `declaration-block-semicolon-space-before`)
* Property names should be lower case. (`property-case`)
* Always place single space after colon character (`declaration-colon-space-after`, `declaration-colon-space-before`)
* Separate custom property names with one empty line before standard properties. (`custom-property-empty-line-before`)
* Don't put empty line before first nested declaration. Use one declaration per line. (`declaration-empty-line-before`, 
`declaration-block-semicolon-newline-after: always-multi-line`)
* Always put trailing semicolon for last declaration in block (`declaration-block-trailing-semicolon`)


✕ Examples of *incorrect* code:

```scss
a { Color:pink; top:3px; }

a {
  color: pink; top: 0;
}
``` 
 
✔ Examples of *correct* code:

```scss
a { 
    color: pink; 
    top: 3px;
    
    --foo: pink;
    --bar: red;
}

a {
  color: pink;
  top: 0;
}
``` 

#### 1.2

* Use lower case values for color and short hex length when possible. (`color-hex-case`, `color-hex-length`)
* Use single quotes for string values. (`string-quotes: single`)
* Use one space before `!important`. (`declaration-bang-space-after`, `declaration-bang-space-before`)
* Always use quotes around font family names unless they are keywords. (`font-family-name-quotes: always-unless-keyword`)
* Always use leading zero for fractional numbers less than 1, don't use trailing zeros. (`number-leading-zero`, `number-no-trailing-zeros`) 
* Don't use units for zero lengths. Always write units in lower case (`length-zero-no-unit`, `unit-case`)
* Always use lower case for value keyword (`value-keyword-case`)

✕ Examples of *incorrect* code:

```scss
a { color: #ffffff; }

a { font-family: Times New Roman, "Times", serif; }

a { line-height: .50!important; }

div { margin: 0px 10PX; }

a { display: Block; }
``` 
 
✔ Examples of *correct* code:

```scss
a { color: #fff; }

a { font-family: 'Times New Roman', 'Times', serif; }

a { line-height: 0.5 !important; }

div { margin: 0 10px; }

a { display: block; }
``` 

#### 1.3

* For single line value lists never put space before comma, but after. (`value-list-comma-space-before`, 
`value-list-comma-space-after: always-single-line`)
* For multiline value lists place newline after each comma, don't use extra new lines between values. Place value in 
new line after colon. (`value-list-comma-newline-after: always-multi-line`, `value-list-max-empty-lines`, 
`declaration-colon-newline-after: always-multi-line`)
* Always put space before opening brace of block (`block-opening-brace-space-before`)
* If block is single line, put spaces after opening and before closing brace to separate content from braces 
(`block-opening-brace-space-after': 'always-single-line`, `block-closing-brace-space-before: always-single-line`)
* Don't put empty lines after opening brace or before closing brace in order to separate properties from braces.
(`block-closing-brace-empty-line-before`, `block-closing-brace-newline-after`, `block-closing-brace-newline-before`, 
`block-opening-brace-newline-after`)
* Put one empty line between rule blocks, except when first nested or after comment (`rule-empty-line-before`)

✕ Examples of *incorrect* code:

```scss
a{background-size: 0 ,0;}
a{

  box-shadow: 0 0 0 1px #5b9dd9,
    0 0 2px 1px rgba(30, 140, 190, 0.8);
    
}
``` 
 
✔ Examples of *correct* code:

```scss
a { background-size: 0, 0; }

a {
  box-shadow:
    0 0 0 1px #5b9dd9,
    0 0 2px 1px rgba(30, 140, 190, 0.8);
}
``` 


### Selectors

* Don't have extra empty lines in selector definitions (`selector-max-empty-lines: 0`)

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

✕ Examples of *incorrect* code:

```scss
a,

b {
  color: red;
}
``` 
 
✔ Examples of *correct* code:

```scss
a,
b {
  color: red;
}
``` 


### Whitespace & Comments

* Use soft tabs set to 4 spaces. (`indentation`)
* Maximum line length should be 120. (`max-line-length`)
* Don't use extra spaces and trailing spaces. (`no-eol-whitespace`)
* Don't use more then one empty line anywhere in code (`max-empty-lines`)
* Use one empty line at the EOF. (`no-missing-end-of-source-newline`)
* Use one empty line before comments. Separate comment text with space from `/* */` and `//` (`comment-empty-line-before`,
`comment-whitespace-inside`)


### CSS Functions

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

✕ Examples of *incorrect* code:

```scss

``` 
 
✔ Examples of *correct* code:

```scss

``` 


### Media queries

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

✕ Examples of *incorrect* code:

```scss

``` 
 
✔ Examples of *correct* code:

```scss

``` 


### @rules


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

✕ Examples of *incorrect* code:

```scss

``` 
 
✔ Examples of *correct* code:

```scss

``` 


### Sass/SCSS

* Maximum nesting depth is 3, we follow inception rule (`max-nesting-depth: 3`)

✕ Examples of *incorrect* code:

```scss

``` 
 
✔ Examples of *correct* code:

```scss

``` 



// -------->>>>>


### Section

✕ Examples of *incorrect* code:

```scss

``` 
 
✔ Examples of *correct* code:

```scss

``` 





### Section

✕ Examples of *incorrect* code:

```scss

``` 
 
✔ Examples of *correct* code:

```scss

``` 



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
