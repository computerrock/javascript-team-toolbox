# Sass/SCSS Style Guide

Purpose of this document is to make you familiar with style of writing Sass/SCSS code within Computer Rock.

For validating best code practices, avoiding possible errors and checking code style we use `stylelint`. Projects are 
built using Webpack with interactive output, so default severity is set to "warning". This allows you to develop fast, 
but doesn't mean you should deploy code before fixing all errors and warnings.

Main focus of this document are stylistic choices we made. So not all activated stylelint rules are mentioned, but just 
those related to style. Style is based on existing projects and it mostly doesn't go against IDE's used. 

For IDE code style configuration manuals please check [`./other-docs/`](./other-docs) folder in this project.

If project you are working on doesn't use `stylelint` yet, you can find configuration overview in 
[`Project setup`](./project-setup.md) document.


### 1. Properties & Values

#### 1.1

* Use single line declaration blocks only when they contain one declaration. 
(`declaration-block-single-line-max-declarations: 1`, `declaration-block-semicolon-space-after: always-single-line`, 
`declaration-block-semicolon-space-before`)
* Property names should be lower case. (`property-case`)
* Always place single space after colon character. (`declaration-colon-space-after`, `declaration-colon-space-before`)
* Separate custom property names with one empty line before standard properties. (`custom-property-empty-line-before`)
* Don't put empty line before first nested declaration. Use one declaration per line. (`declaration-empty-line-before`, 
`declaration-block-semicolon-newline-after: always-multi-line`)
* Always put trailing semicolon for last declaration in block. (`declaration-block-trailing-semicolon`)


✕ Examples of *incorrect* code:

```
a { Color:pink; top:3px; }

a {
  color: pink; top: 0;
}
``` 
 
✔ Examples of *correct* code:

```
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
* Always use leading zero for fractional numbers less than 1, don't use trailing zeros. (`number-leading-zero`, 
`number-no-trailing-zeros`) 
* Don't use units for zero lengths. Always write units in lower case. (`length-zero-no-unit`, `unit-case`)
* Always use lower case for value keyword. (`value-keyword-case`)

✕ Examples of *incorrect* code:

```
a { color: #ffffff; }

a { font-family: Times New Roman, "Times", serif; }

a { line-height: .50!important; }

div { margin: 0px 10PX; }

a { display: Block; }
``` 
 
✔ Examples of *correct* code:

```
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
* Always put space before opening brace of block. (`block-opening-brace-space-before`)
* If block is single line, put spaces after opening and before closing brace to separate content from braces. 
(`block-opening-brace-space-after': 'always-single-line`, `block-closing-brace-space-before: always-single-line`)
* Don't put empty lines after opening brace or before closing brace in order to separate properties from braces.
(`block-closing-brace-empty-line-before`, `block-closing-brace-newline-after`, `block-closing-brace-newline-before`, 
`block-opening-brace-newline-after`)
* Put one empty line between rule blocks, except when first nested or after comment. (`rule-empty-line-before`)

✕ Examples of *incorrect* code:

```
a{background-size: 0 ,0;}
a{

  box-shadow: 0 0 0 1px #5b9dd9,
    0 0 2px 1px rgba(30, 140, 190, 0.8);
    
}
``` 
 
✔ Examples of *correct* code:

```
a { background-size: 0, 0; }

a {
  box-shadow:
    0 0 0 1px #5b9dd9,
    0 0 2px 1px rgba(30, 140, 190, 0.8);
}
``` 


### 2. Selectors

* Don't have extra empty lines in selector definitions. (`selector-max-empty-lines: 0`)
* For selector attribute values always use quotes, without spaces around operator or spacing between brackets.
(`selector-attribute-quotes`, `selector-attribute-operator-space-before`, `selector-attribute-operator-space-after`, 
`selector-attribute-brackets-space-inside`) 
* Use spaces around selector combinator operators and descendant combinator. (`selector-combinator-space-after`, 
`selector-combinator-space-before`, `selector-descendant-combinator-no-non-space`)
* Type selectors, pseudo class and element selectors should always be written lower case. Don't use spaces around content 
of pseudo class selector brackets. For pseudo classes use single colon (`:`), for elements double (`::`).
(`selector-type-case`, `selector-pseudo-class-case`, `selector-pseudo-class-parentheses-space-inside`, 
`selector-pseudo-element-case`, `selector-pseudo-element-colon-notation`)
* For selector lists always use new line after comma character. Don't use extra spacing around comma character.
(`selector-list-comma-newline-after`, `selector-list-comma-space-before`)

✕ Examples of *incorrect* code:

```
a , b,

i {
  color: red;
}

a>b { color: pink; }

[ title= flower ] {}

A:HOVER {}

input:not( [type="submit"] ) {}

div:before {}

``` 
 
✔ Examples of *correct* code:

```
a,
b,
i {
  color: red;
}

a > b { color: pink; }

[title='flower'] {}

a:hover {}

input:not([type='submit']) {}

div::before {}

``` 


### 3. Whitespace & Comments

* Use soft tabs set to 4 spaces. (`indentation`)
* Maximum line length should be 120. (`max-line-length`)
* Don't use extra spaces and trailing spaces. (`no-eol-whitespace`)
* Don't use more then one empty line anywhere in code. (`max-empty-lines`)
* Use one empty line at the EOF. (`no-missing-end-of-source-newline`)
* Use one empty line before comments. Separate comment text with space from `/* */` and `//`.
(`comment-empty-line-before`, `comment-whitespace-inside`)


### 4. CSS Functions

* Always write function names in lower case. (`function-name-case`)
* Use single quotes for URL function arguments. (`function-url-quotes`)
* When listing function parameters don't use empty lines between arguments, place new line after comma character and 
opening bracket. When arguments are in one line use space after comma character, but not after/before brackets.
 (`function-max-empty-lines`, `function-comma-newline-after`, `function-parentheses-newline-inside`, 
 `function-parentheses-space-inside`, `function-comma-space-after`, `function-comma-space-before`)
* When listing multiple functions separate them by single space. (`function-whitespace-after`)

✕ Examples of *incorrect* code:

```
a {
  transform: translate(1
  
      ,1)
}

b { 
    transform: translate(1 , 1)scale( 3 );
}
``` 
 
✔ Examples of *correct* code:

```
a {
  transform:
    translate(
      1,
      1
    );
}

b { 
    transform: translate(1, 1) scale(3);
}
``` 


### 5. @ rules

* Name at-rules in lower case only. Use one space character to separate rule name from rest of expressions. 
(`at-rule-name-case`, `at-rule-name-space-after`)
* Use semicolon at the end where applicable. Separate multiple rules with empty lines.
(`at-rule-semicolon-newline-after`, `at-rule-semicolon-space-before`, `at-rule-empty-line-before`)


### 6. Media queries

* Don's use spaces to separate content of media query brackets from content. (`media-feature-parentheses-space-inside`)
* Use single space after colon in media features. Features should be written in lower case.
(`media-feature-colon-space-after`, `media-feature-colon-space-before`, `media-feature-name-case`)
* Use spaces around range operators. (`media-feature-range-operator-space-after`, `media-feature-range-operator-space-before`)
* For multi-line queries place new line after comma character, for single line queris place space after comma character.
(`media-query-list-comma-newline-after`, `media-query-list-comma-space-after`, `media-query-list-comma-space-before`)

✕ Examples of *incorrect* code:

```
@media ( MIN-WIDTH :700px ) {}

@media (width>=600px) {}

@media screen and (color),projection and (color) {}

``` 
 
✔ Examples of *correct* code:

```
@media (min-width: 700px) {}

@media (width >= 600px) {}

@media screen and (color), projection and (color) {}

``` 


### 7. Sass/SCSS

#### 7.1

* Maximum nesting depth is 3, we follow inception rule (`max-nesting-depth: 3`)
* When naming variables, mixins, functions, and placeholders use `kebab-case` ('^([a-z][a-z0-9]*)(-[a-z0-9]+)*$') 
(`scss/dollar-variable-pattern`, `scss/at-mixin-pattern`, `scss/at-function-pattern`, `scss/percent-placeholder-pattern`)
* When importing other `.scss` files don't use partial `_` nor extension. (`scss/at-import-no-partial-leading-underscore`,
`scss/at-import-partial-extension-blacklist`)
* Use double slash comments above properties, separate them with one empty line from rest of the properties.
(`scss/double-slash-comment-inline`, `scss/double-slash-comment-whitespace-inside`, `scss/double-slash-comment-empty-line-before`)

#### 7.2

* Use new line after dollar variable colon. Use space after variable colon.
(`scss/dollar-variable-colon-newline-after`, `scss/dollar-variable-colon-space-after`, `scss/dollar-variable-colon-space-before`) 
* Interpolate variables that are used with features that require custom identifiers. (`scss/dollar-variable-no-missing-interpolation`)
* Use spaces around Sass operators. Line breaks after operators are disallowed, use them before. 
(`scss/operator-no-unspaced`, `scss/operator-no-newline-after`)

✕ Examples of *incorrect* code:

```
a { 
    $foo:100px;$baz:20; 
    
    $var: "my-animation";
    animation-name: $var;
    
    width: 10px+
     $n;
    height: 10px+$foo;
}
``` 
 
✔ Examples of *correct* code:

```
a { 
    $foo: 100px;
    $baz: 20;
    
    $var: "my-animation";
    animation-name: #{$var};
    
    width: 10px 
        + $foo;
    height: 10px + $foo;
}
``` 

#### 7.3

* `@if` and `@else` should always be formatted like in example.
(`scss/at-else-closing-brace-newline-after`, `scss/at-else-closing-brace-space-after`, `scss/at-else-empty-line-before`,
`scss/at-else-if-parentheses-space-before`, `scss/at-if-closing-brace-newline-after`, `scss/at-if-closing-brace-space-after`) 
 
✔ Examples of *correct* code:

```
a {
  @if ($x == 1) {
    // ...
  } @else {
    // ...
  } 
  
  width: 10px; 
}
``` 

### 7.4

* Always use at-extend with placeholder. (`scss/at-extend-no-missing-placeholder`)
* Always use parentheses for mixin calls (`scss/at-mixin-argumentless-call-parentheses`)
* Don't use named parameters in function and mixin calls. 
(`scss/at-function-named-arguments`, `scss/at-mixin-named-arguments`)
* Don't use space between function and mixin name and opening parentheses in calls.
(`scss/at-function-parentheses-space-before`, `scss/at-mixin-parentheses-space-before`)

✕ Examples of *incorrect* code:

```
p {
  @extend .some-class;
  
  animation: animation(250ms);
  
  @include mixin-name;
}
``` 
 
✔ Examples of *correct* code:

```
p {
  @extend %placeholder;
  
  animation: animation(250ms);
  
  @include mixin-name();
}
``` 

        
### 8. BEM

For naming classes we use BEM syntax rules. Please read [`Sass/SCSS Project Architecture`](./sass-scss-project-architecture.md)
to make yourself familiar with the approach we use.

You can read more about [BEM methodology](http://getbem.com/) on official documentation page. 
