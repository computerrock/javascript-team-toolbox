# JavaScript Style Guide

Purpose of this document is to make you familiar with style of writing JavaScript code within Computer Rock.

For validating best code practices, avoiding possible errors and checking code style we use *ESLint*. Configuration for 
`eslint` is centrally maintained and published from next packages (sourcecode is in `./packages` folder):

* @computerrock/eslint-config-base
* @computerrock/eslint-config-react-app
* @computerrock/eslint-config-react-native-app

We use `eslint-loader` in Webpack so even warnings are very visible. This is why we mostly use "WARNING" level for 
potential errors, and avoid "ERROR" level. Steps for configuring project to use `eslint-loader` and configuration 
packages are described in [`Project setup and contribution guide`](./project-setup-and-contribution-guide.md).

Main focus of this document are stylistic choices we made, so not all activated ESLint rules are mentioned, but just those 
related to style. Style is based on existing projects, it mostly doesn't go against IDE's used and is as close as possible 
to style in main third party libraries we use and their documentations (React, Redux, etc..) 

For IDE code style configuration manuals please check  `./other-docs/` folder in this project.


### 1. Variables & References

* Use semicolons at line break instead of ASI. (`semi`, `semi-style`)
* Don't use undeclared variables. (`no-undef`)
* Declare variables separately, one per line. (`one-var`, `one-var-declaration-per-line`)
* Use `const` for all references; avoid using `var`. (`prefer-const`, `no-const-assign`)
* If reference will be re-assigned, use `let` instead of `var`. (`no-var`)
* Group all `const` and then group all `let`.
* If you must use `var`, place them at the top of their containing scope. (`vars-on-top`, `block-scoped-var`)
* Assign variables where you need them, but place them in a reasonable place.
* Name things in camelcase, all caps is allowed for constants. (`camelcase`)
* Don't use leading or trailing underscores. (`no-underscore-dangle`)

✕ Examples of *incorrect* code:

```javascript
function foo() {
    var bar_, baz;
    var bar_baz;
    
    return fooBar
}
``` 
 
✔ Examples of *correct* code:

```
function foo(fooBar) {
    const bar = 'bar';
    const bazBar = {foo: 'foo'};
    const BAR_BAZ = 1;  
    let __barBaz__;  
    
    return fooBar
}
``` 


### 2. Operators 

* Don’t chain variable assignments. (`no-multi-assign`)
* Avoid using unary increments and decrements `++`, `--`. (`no-plusplus`)
* Use assignment operator shorthand where possible. (`operator-assignment`)
* Use `===` and `!==` over `==` and `!=`. (`eqeqeq`)
* Use shortcuts for booleans, but explicit comparisons for strings and numbers.
* Avoid unneeded ternary statements. (`no-unneeded-ternary`)
* When mixing operators, enclose them in parentheses. The only exception is the standard arithmetic operators 
(`+`, `-`, `*`, `&`, `/`) since their precedence is broadly understood. (`no-mixed-operators`)

✕ Examples of *incorrect* code:

```javascript
let a = b = c = 1;
a++;
a = a + b;

if (isValid === true) {}
if (collection.length) {}
if (collection.length) {}

const bar = c ? true : false;
const bar = c ? true : false;
const bar = c ? true : false;

const foo = a && b < 0 || c > 0 || d + 1 === 0;
const bar = a ** b - 5 % d;
if (a || b && c) { // one may be confused into thinking (a || b) && c
    return d;
}
``` 
 
✔ Examples of *correct* code:

```javascript
let a = 1;
let b = a;
let c = a;
a += 1;
a += b;
  
if (isValid) {}
if (name !== '') {}
if (collection.length > 0) {}  

const foo = a || b;
const bar = !!c;
const baz = !c;

const foo = (a && b < 0) || c > 0 || (d + 1 === 0);
const bar = (a ** b) - (5 % d);
if (a || (b && c)) {
    return d;
}
``` 


### 3. Control statements

* Don't use `if` statements as the only statement in `else` blocks. (`no-lonely-if`)
* Use braces with all multi-line blocks, use single line without braces. (`nonblock-statement-body-position`)
*  If an `if` block always executes a return statement, the subsequent `else` block is unnecessary. A return in an 
`else if` block following an `if` block that contains a `return` can be separated into multiple `if` blocks. (`no-else-return`)
* In case control statement gets too long or exceeds the maximum line length, each (grouped) condition could be put into 
a new line. The logical operator should begin the line.
* Don't use selection operators in place of control statements.

✕ Examples of *incorrect* code:

```javascript
if (foo) {
    // ...
} else {
    if (bar) {
        // ...
    }
}

if (foo)
  bar();

function foo() {
    if (x) {
        return x;
    } else {
        return y;
    }
}

function cats() {
    if (x) {
        return x;
    } else if (y) {
        return y;
    }
}

!isRunning && startRunning();
``` 
 
✔ Examples of *correct* code:

```javascript
if (foo) {
    // ...
} else if (bar) {
    // ...
}

if (foo) bar();

function foo() {
    if (x) {
        return x;
    }
    
    return y;
}

function cats() {
    if (x) {
        return x;
    }
    
    if (y) {
        return y;
    }
}

if (
    (foo === 123 || bar === 'abc')
    && doesItLookGoodWhenItBecomesThatLong()
    && isThisReallyHappening()
) {
    thing1();
}

if (!isRunning) {
    startRunning();
}
``` 


### 4. Strings

* Use single quotes `''` for strings. Multiline strings in `"` are not allowed. (`quotes`, `no-multi-str`)
* When programmatically building up strings, use template strings instead of concatenation. (`prefer-template`)
* Strings that cause the line to go over `max-len` should not be written across multiple lines using string concatenation.
* Never use eval() on a string, it opens too many vulnerabilities. (`no-eval`)
* Do not unnecessarily escape characters in strings. (`no-useless-escape`)

✕ Examples of *incorrect* code:

```javascript
const name = "Batman";

function sayHi(name) {
    return "How are you, " + name + "?";
}

const foo = '\'this\' \i\s \"quoted\"';
``` 
 
✔ Examples of *correct* code:

```javascript
const name = 'Batman';

function sayHi(name) {
    return `How are you, ${name}?`;
}

const foo = '\'this\' is "quoted"';
``` 


### 5. Objects 

* Use the literal syntax for object creation. (`no-new-object`)
* If none of the properties are invalid identifiers don't use quotes, if at least one is use qoutes for all 
 properties. (`quote-props: consistent-as-needed`)
* In multiline object literal use comma last and for every property, trailing comma. (`comma-dangle`, `comma-style`)
* Use object spread `...` to shallow clone objects.
* Use computed property names when creating objects with dynamic property names.
* Decide when to use object destructuring for accessing multiple properties of an object. (`prefer-destructuring: off`)
* Decide when to use object method and property shorthands. Group them at the beginning of object 
declaration. (`object-shorthand: off`)
* Decide when not to use dot notation when accessing properties.  Use bracket notation `[]` when accessing properties 
with a variable.(`dot-notation: off`)

✕ Examples of *incorrect* code:

```javascript
const item = new Object();

const item = {
    foo: 3,
    bar: 4,
    'data-blah': 5
};
``` 
 
✔ Examples of *correct* code:

```javascript
const item = {};

const item = {
    'foo': 3,
    'bar': 4,
    'data-blah': 5,
};
``` 


### 6. Arrays

* Use the literal syntax for array creation. (`no-array-constructor`)
* In multiline array literal use comma last and for item, trailing comma. (`comma-dangle`, `comma-style`)
* Use push instead of direct assignment for add items to an array.
* Use array spread `...` to copy arrays and convert array-like objects to arrays.
* Decide when to use array destructuring. (`prefer-destructuring: off`)

✕ Examples of *incorrect* code:

```javascript
const items = new Array();

const arr = [
    3
    ,4
    ,5
];
``` 
 
✔ Examples of *correct* code:

```javascript
const items = [];

const arr = [
    3,
    4,
    5,
];
``` 


### 7. Functions

* Never use the Function constructor to create a new function. (`no-new-func`)
* Use named function expressions instead of function declarations. (`func-style: expression`)
* Never declare a function in a non-function block (if, while, etc). Assign the function to a variable instead. (`no-loop-func`)
* ECMA-262 defines a block as a list of statements. A function declaration is not a statement.
* Wrap immediately invoked function expressions in parentheses. (`wrap-iife`)
* Never name a parameter `arguments`. It will take precedence over the `arguments` object given to every function scope.
* Never use `arguments`, opt to use rest syntax `...` instead. (`prefer-rest-params`)
* Use default parameter syntax rather than mutating function arguments.
* Avoid side effects with default parameters. Always put default parameters last.
* Use object destructuring for multiple return values, not array destructuring.
* Prefer the use of the spread operator `...` to call variadic functions. (`prefer-spread`)

✕ Examples of *incorrect* code:

```javascript
function foo() {
  // ...
}

const foo2 = function () {
  // ...
};

function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

function processInput(input) {
    // ...
    return [left, right, top, bottom];
}

// the caller needs to think about the order of return data
const [left, __, top] = processInput(input);

const x = [1, 2, 3, 4, 5];
console.log.apply(console, x);
``` 
 
✔ Examples of *correct* code:

```javascript
const foo = function fromFoo() {
  // ...
};

const foo2 = () => {
    // ...
};

function concatenateAll(...args) {
  return args.join('');
}

function processInput(input) {
    // then a miracle occurs
    return {left, right, top, bottom};
}

// the caller selects only the data they need
const {left, top} = processInput(input);

const x = [1, 2, 3, 4, 5];
console.log(...x);
``` 


### 8. Arrow functions

* When passing an inline callback anonymous function, use arrow function notation. (`prefer-arrow-callback`)
* If the function body consists of a single statement returning an expression without side effects, omit the braces and
 use the implicit return. Otherwise, keep the braces and use a return statement. (`arrow-parens`, `arrow-body-style`)
* If your function takes a single argument and doesn’t use braces, omit the parentheses. Otherwise, always include
 parentheses around arguments for clarity and consistency. (`arrow-parens`)
* Avoid confusing arrow function syntax `=>` with comparison operators `<=`, `>=`. (`no-confusing-arrow`) 

✕ Examples of *incorrect* code:

```javascript
[1, 2, 3].map(function (x) {
    const y = x + 1;
  
    return x * y;
});

[1, 2, 3].map((number) => {
    const nextNumber = number + 1;
    return `A string containing the ${nextNumber}.`;
});

const itemHeight = item => item.height > 256 ? item.largeSize : item.smallSize;
``` 
 
✔ Examples of *correct* code:

```javascript
[1, 2, 3].map(x => {
    const y = x + 1;
  
    return x * y;
});

[1, 2, 3].map(number => `A string containing the ${number}.`);

const itemHeight = item => {
    const {height, largeSize, smallSize} = item;
    
    return height > 256 ? largeSize : smallSize;
};
``` 


### 9. Classes

* Always use class. Avoid manipulating prototype directly.
* Use extends for inheritance.
* Methods can return this to help with method chaining.
* It’s okay to write a custom toString() method, just make sure it works successfully and causes no side effects.
* Use PascalCase only when naming constructors or classes. (`new-cap`)
* Always use parentheses when invoking a constructor with no arguments. (`new-parens`)

✕ Examples of *incorrect* code:

```javascript
function Queue(contents = []) {
    this.queue = [...contents];
}

Queue.prototype.pop = function () {
    const value = this.queue[0];
    this.queue.splice(0, 1);
    return value;
};

function user(options) {
    this.name = options.name;
}

const bad = new user({
    name: 'nope',
});
``` 
 
✔ Examples of *correct* code:

```javascript
class Queue {
    constructor(contents = []) {
        this.queue = [...contents];
        this.isLocked = false;
    }
    
    pop() {
        const value = this.queue[0];
        this.queue.splice(0, 1);
        return value;
    }
    
    setLock(isLocked) {
        this.isLocked = isLocked;
        return this;
    }
}

class User {
    constructor(options) {
        this.name = options.name;
    }
}

const good = new User({
    name: 'yup',
});
``` 


### 10. Modules

* Always use modules (import/export) over a non-standard module system.
* Always put imports before other statements. Don't implicitly duplicate. (`import/first`, `import/no-duplicates`)
* Place one blank line before other statements. (`import/newline-after-import`)
* Don't use file extensions for JS files. (`import/extensions: js, mjs, jsx`)
* Don't put spaces around named imports/exports inside curly braces. (`object-curly-spacing`)
* Multiline imports should be indented just like multiline array and object literals.

✕ Examples of *incorrect* code:

```javascript
import { foo, bar, baz } from './fooBarBaz';
``` 
 
✔ Examples of *correct* code:

```javascript
import {foo, bar, baz} from './fooBarBaz';
``` 


### 11. Whitespace

#### 11.1

* Use soft tabs set to 4 spaces. (`indent`, `no-mixed-spaces-and-tabs`, `no-tabs`)
* Don't use extra spaces and trailing spaces. (`no-multi-spaces`, `no-trailing-spaces`)
* Don't put space before semicolon, use it after if needed. (`semi-spacing`)
* Separate code with 2 empty lines max, preferably 1. (`no-multiple-empty-lines`)
* Use one empty line at the EOF. (`eol-last`)
* Don't use spacing in template literal expressions and template tags. (`template-curly-spacing`, `template-tag-spacing`)

✕ Examples of *incorrect* code:

```javascript
let foo  =  'foo' ;
let bar = {
    baz: null,
    bazz: biz `baz-${ foo }`
};



bar.baz = foo;
``` 
 
✔ Examples of *correct* code:

```javascript
let foo = 'foo';
let bar = {
    baz: null,
    bazz: biz`baz-${foo}`,    
};

bar.baz = foo;

``` 

#### 11.2

* Maximum line length should be 120. (`max-len`)
* Use line break between operator and previous argument when line is too long. (`operator-linebreak`)
* Don't use line break before or after `=` in assignment, and `=>` in arrow functions. Use parenthesis to break line
 correctly and place short expression in next line. (`operator-linebreak`)
* Set off operators with spaces. (`space-infix-ops`)
* Use space around word unary operations, don't use them around non-word operations. (`space-unary-ops`)

✕ Examples of *incorrect* code:

```javascript
const foo
    = 'superLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongString';
let fooType = typeof!foo;
let baz = 2 +                
         3 +
         4;
let bar=baz+5;
++ bar;
``` 

✔ Examples of *correct* code:

```javascript
const foo = (
    'superLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongString'
);
let fooType = typeof foo;
let baz = 2
   + 3
   + 4;
let bar = baz + 5;
++bar;
``` 

#### 11.3

* Use one true brace style for blocks. Single line blocks are allowed. (`brace-style: 1tbs`)
* Use consistent spacing before and after keywords, don't put spaces around parenthesis content. (`keyword-spacing`,
 `space-in-parens`)
* Pad single line blocks with spaces. (`block-spacing`)
* Place 1 space before the leading brace of a block. (`space-before-blocks`)
* Don't put blank lines before first block statement, and after last statement. (`padded-blocks`)
* Use correct spacing around colons of switch statements. (`switch-colon-spacing`)

✕ Examples of *incorrect* code:

```javascript
let foo;

if( !foo ){
    
    foo = 'bar';
    
}else{foo = 'baz';}
if( foo !== 'baz' ){foo = 'zab';}

switch (a) {
    case 0 :break;
    default :foo();
}
``` 
 
✔ Examples of *correct* code:

```javascript
let name;

if (!name) {
    name = 'bar';
} else {
    name = 'baz';
}

if (name !== 'baz') { name = 'zab'; }

switch (a) {
    case 0: foo(); break;
    case 1:
        bar();
        break;
    default:
        baz();
        break;
}
``` 

#### 11.4

* Avoid spaces before commas and require a space after commas. (`comma-spacing`)
* Don't put spaces around content of brackets (array literals, destructuring assignments). (`array-bracket-spacing`)
* Use new line inside brackets consistently. (`array-bracket-newline`)
* Don't put spaces around content of curly braces (object literals, destructuring assignments). (`object-curly-spacing`)
* Use new line inside curly braces consistently. (`object-curly-newline`, `object-property-newline`)
* Use proper spacing between keys and values. (`key-spacing`)
* Don't use spacing inside of computed properties. (`computed-property-spacing`)
* Use indentation when making long method chains (more than 4 method chains). Use a leading dot. (`newline-per-chained-call`, `dot-location`)
* Don't use spacing when using spread operator. (`rest-spread-spacing`)

✕ Examples of *incorrect* code:

```javascript
const foo = [ 1, 2 , 3 , 4, 5 ];
const foo2 = [1,
    2, 3, 4,
    5];
const bar = { barr: 'barr', barr3 : 'barr3', barr4:'barr4' };
bar[ 'barr2' ] = 'barr2';
const baz = getBaz().
    from.
    deeply.netsted.property.
    chain();
let [a, b, ... arr] = [1, 2, 3, 4, 5];
let { x, y, ... z } = { x: 1, y: 2, a: 3, b: 4 };
``` 
 
✔ Examples of *correct* code:

```javascript
const foo = [1, 2, 3, 4, 5];
const foo2a = [
    1, 2, 3, 4, 5
];
const foo2b = [
    1,
    2, 
    3, 
    4,
    5
];
const bar = {barr: 'barr', 
    barr3: 'barr3', barr4: 'barr4'};
bar['barr2'] = 'barr2';
const baz = getBaz()
    .from
    .deep
    .chain();
let [a, b, ...arr] = [1, 2, 3, 4, 5];
let {x, y, ...z} = {x: 1, y: 2, a: 3, b: 4};
``` 

#### 11.5

* Use space before function parenthesis for anonymous and async arrow functions, never for named functions. (`space-before-function-paren`)
* Don't put space between function name and calling parenthesis. (`func-call-spacing`)
* Use new lines consistently inside function parenthesis. (`function-paren-newline`)
* Use consistent spacing around arrow. (`arrow-spacing`, `implicit-arrow-linebreak`)
* Place generator star next to function or yield keyword. (`generator-star-spacing`, `yield-star-spacing`)
* Use empty lines between class members. (`lines-between-class-members`)

✕ Examples of *incorrect* code:

```javascript
const foo = function *(bar) {
    yield *other(bar);
};

foo (bar=>bar + bar);

const fooBar = (foo) =>
    bar;

class Foo {
    bar() {}
    baz() {}
}
``` 
 
✔ Examples of *correct* code:

```javascript
const foo = function* (bar) {
    yield* other(bar);
};

let baz = foo(bar => bar + bar);

const fooBar = (foo) => (bar);
const fooBar2 = (foo) => (
    bar
);

class Foo {
    bar() {}

    baz() {}
}
``` 


### 12. Comments 

* Use `/** ... */` for multi-line comments.
* Use `//` for single line comments. Place single line comments on a newline above the subject of the comment. Put an 
empty line before the comment unless it’s on the first line of a block.
* Start all comments with a space to make it easier to read. (`spaced-comment`)
* Prefix comments with TODO to mark problem that needs to be revisited.


### 13. React/JSX

#### 13.1

* Do not use React.createElement unless you're initializing the app from a file that is not JSX. (`react/prefer-es6-class`)
* Extend `PureComponent` and `Component`.
* Only declare one React component per file. Multiple stateless functional components are allowed per file. (`react/no-multi-comp`)
* Always use JSX syntax.
* If state and refs are not used, use stateless function (`react/prefer-stateless-function`)
* Use `.js` extension for React components. (`react/jsx-filename-extension: .js`)
* Use PascalCase for file names. e.g. Listing.js (`react/jsx-pascal-case`)
* Use the filename as the component name. For root components of a directory, use `index.js` as the filename and use 
the directory name as the component name when importing.

✕ Examples of *incorrect* code:

```javascript
const Hello  = React.createClass({
    // ...
    render() {
        return <div>{this.state.hello}</div>;
    }
});

import Hello  from './Hello /Hello ';
``` 
 
✔ Examples of *correct* code:

```javascript
class Hello  extends React.Component {
    // ...
    render() {
        return <div>{this.state.hello}</div>;
    }
}

function Hello ({hello}) {
    return <div>{hello}</div>;
}

import Hello  from './Hello ';
``` 

#### 13.2

* Use is/has prefix for boolean prop names (`react/boolean-prop-naming`)
* Always define props type validation (`react/prop-types`)
* Create defaultProps definition for every prop that is not a required prop (`react/require-default-props`)
* When rendering multiline JSX, put parenthesis around it (`react/jsx-wrap-multilines`)

✕ Examples of *incorrect* code:

```javascript
class Hello  extends React.Component {
    static propTypes = {
        enabled: PropTypes.bool,
    };
    
    render() {
        return <div>
            <span>Hello, {this.props.name}!</span>
        </div>;
    }
}
``` 
 
✔ Examples of *correct* code:

```javascript
class Hello  extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        isEnabled: PropTypes.bool,
    };
    
    static defaultProps = {
        isEnabled: true
    };
    
    render() {
        return (
            <div>
                <span>Hello, {this.props.name}!</span>
            </div>
        );
    }
}
``` 

#### 13.3

* Indent JSX with 4 spaces (`react/jsx-indent: 4`, `react/jsx-indent-props: 4`)
* Closing bracket location should be aligned with opening bracket (`react/jsx-closing-bracket-location: tag-aligned`)
* For multiline element, first prop should be in next line (`react/jsx-first-prop-new-line: multiline-multiprop`)
* For multiline element, maximum one prop is alowed per line (`react/jsx-max-props-per-line`)
* Closing tag should be aligned with opening tag (`react/jsx-closing-tag-location`)
* Put space before self closing tag bracket (`react/jsx-tag-spacing: beforeSelfClosing`)
* Don't use extra closing tags for components and elements without children (`react/self-closing-comp`)
* Don't use extra spaces between props (`react/jsx-props-no-multi-spaces`)
* Don't use spaces around prop assignment symbol `=` (`react/jsx-equals-spacing`)
* Always use double quotes (") for JSX attributes, but single quotes (') for all other JS. (`jsx-quotes`)
* Use curly braces only for non string values and expressions (`react/jsx-curly-brace-presence`)
* Don't put spaces around content in JSX prop curly braces. (`react/jsx-curly-spacing`)

✕ Examples of *incorrect* code:

```jsx
<Foo superLongParam='bar'
     anotherSuperLongParam='baz' />
<Foo    bar = { 'bar' }/>
<Foo barLength = { 9000 }></Foo>
``` 
 
✔ Examples of *correct* code:

```jsx
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
/>
<Foo bar="bar" />
<Foo barLength={9000} />
``` 
