# Frontend coding style guide
This document is created based on the [Kahn academy style guide](https://github.com/Khan/style-guides/blob/master/style/javascript.md)
and
[Airbnb Javascript style guide](https://github.com/airbnb/javascript)

## Javascript

### Vanilla

#### Syntax
**Naming**
```Javascript
ClassNames // capitalised camelcase
CONSTANT_TO_BE_CONSTANT // block letters with _ denoting space
everythingElseInCamelCase // everything else in camel case.
```
**Abreviation Esceptions**

Abreviations are kept in block letters only in Class names, in all other situations it is treated as a regular word - in 
camelCase
```Javascript
PINClass // class name
isPinValid // method name
pinNumber //  variable name
```
**Naming private methods and properties**

Private methods and properties (in files, classes, and namespaces) should be named with a leading underscore.
```Javascript
function _PrivateClass() {
    // should not be instantiated outside of this file
}

function PublicClass(param) {
    this.publicMember = param;
    this._privateMember = new _PrivateClass();
}

var x = new _PrivateClass();  // OK - we’re in the same file.
var y = new PublicClass();    // OK
var z = y._privateMember;     // NOT OK!
```
Rationale: leading underscores for private methods and properties is consistent with the styles used in numerous 
JavaScript libraries, many of which we include in our code base.

**FileNames**

General rule is camelCase. Exception are files that are exporting a single class or are intended to be used by a single class, then file name should match the class name.
```
fileName.js
ClassFile.js
ClassFile.scss
```

**Indentation**

Use tab for indentation.

Extra indentation should be used to clearly distinguish multiline conditionals from the following block of code.

Yes:
```Javascript
if (someReallyLongBooleanVariableIMeanReallyLong && 
        someOtherBoolean) {
    return "monkeys";
}
```

No:
```Javascript
if (someReallyLongBooleanVariableIMeanReallyLong &&
someOtherBoolean) {
    return "monkeys";
}

if (someReallyLongBooleanVariableIMeanReallyLong &&
    someOtherBoolean) {
    return "monkeys";
}
```

**Braces**

Braces should always be used on blocks.

`if/else/for/while/try` should always have braces and always go on multiple lines, with the opening brace on the same line.

Yes:
```Javascript
if (true) {
    blah();
}
```
else/else if/catch should go on the same line as the brace:

```Javascript
if (blah) {
    baz();
} else {
    baz2();
}
```

No:
```Javascript
if (true)
    blah();
```

**Ternaries**

Ideally, ternaries are written on a single line:
```Javascript
const color = selected ? 'green' : 'orange'
```

If the ternary is too long to fit on a single line, within the 121-character limit, each fork of the ternary should be 
on its own line.

Yes:
```Javascript
const result = reallyVeryLengthConditional
    ? superLongComputationOfPositiveResult()
    : superLongComputationOfNegativeResult();

const style = selected
    ? {
        color: 'green',
        fontWeight: 'bold',
    }
    : {
        color: 'orange',
    }
```

No:
```Javascript
// Unnecessarily split:
const color = selected
    ? 'green'
    : 'orange';

// Too long
const result = reallyVeryLengthConditional ? superLongComputationOfPositiveResult() : superLongComputationOfNegativeResult();

// Incorrectly split
const result = reallyVeryLengthConditional ?
    superLongComputationOfPositiveResult() :
    superLongComputationOfNegativeResult();
```
Do not use nested ternaries, they are very hard to read and can easily escalate to a mess of a code. Better to resolve extra conditions beforehand
No:
```Javascript
const result = firstCondition ? subCondition ? firstSubTrue : secondSubFalse : firstConditionFalse
```

**Spaces**

Don't insert extra spaces between parens, brackets, or braces.

Yes:

```Javascript
// Literals:
const fancyPants = pants.map((pant) => ({...pant, isFancy: true}));
const toCartesian = (r, theta) => [r * cos(theta), r * sin(theta)];

// Destructuring:
const {StyleSheet, css} = require('aphrodite');
const [x, y] = coordinates;


// Template strings:
const mission = `A ${price}, ${quality} education for ${clientele}.`;

// Parens:
if ((a === b) || (b === c)) {...}
```

No:
```Javascript
// Literals:
const fancyPants = pants.map((pant) => ({ ...pant, isFancy: true }));
const toCartesian = (r, theta) => [ r * cos(theta), r * sin(theta) ];

// Destructuring:
const { StyleSheet, css } = require('aphrodite');
const [ x, y ] = coordinates;

// Template strings:
const mission = `A ${ price }, ${ quality } education for ${ clientele }.`;

// Parens:
if ( ( a === b ) || ( b === c ) ) {...}
```

**Line length**

Lines should not exceed 121 characters so that two files can be opened next to each other

**Imports and grouping**
Use ES2015 imports (`import foo from 'foo'`). There should be three groups of imports in the following order form the top:
1. Vendor libraries and other absolute path modules 
2. Types, if used
3. Project modules
4. Assets

_Each group should be separated with empty line._

When there are 5 or more named imports in one line, break them each to its
own so there is no possibility to break the 120 character limit

```Javascript
import React from 'react';
import moment from 'moment';

import MediaItem from '../types/MediaItem';

import Carousel from '../Carousel/Carousel';
import {
    Row,
    Column,
    Button,
    Tab,
    Navigation,
    Panel
} from '../utilities/layout'
``` 
#### Comments and Documentation

**Inline Comments**

Inline style comments should be of the `//` variety, not the `/* */` variety, unless JSX is used then the comments should be:
- inline: `{/* comment */}`
- multiline: 

```JSX
{/* 
    some
    commment
*/}
```

**Top level file and class comments**

All files and classes should have JSDoc comments.

JSDoc can be parsed by a number of open source tools, and must be well-formed.

Syntax:
```Javascript
/**
 * A JSDoc comment should begin with a slash and 2 asterisks.
 */
```

Top-level (top-of-file) comments are designed to orient readers unfamiliar with the code to what is in this file and any
 other disclaimers clients of the code should be given. It should provide a description of the file's contents and any 
 dependencies or compatibility information. As an example:

```Javascript
/**
 * Various components to handle management of lists of coaches for
 * the profile page.
 *
 * These utilities were not written to be a general purpose utility
 * for the entire code base, but has been optimized with the
 * assumption that the Profile namespace is fully loaded.

 */
```
Class comments should be used for every class, and give a description along with appropriate type tags (see "Methods and 
properties" comments for more information on types on the constructor).
```Javascript
/**
 * Class making something fun and easy.
 *
 * @param {string} arg1 An argument that makes this more interesting.
 * @param {Array.<number>} arg2 List of numbers to be processed.
 */
function SomeFunClass(arg1, arg2) {
  // ...
}
```

**Methods and properties comments**

All non-trivial methods and properties should also have JSDoc comments.
Type annotations are strongly encouraged; if there is even a slight chance that the type will be ambiguous to future 
readers, put in a type annotation.

Type annotations are based on the ES4/JS2 type system, and are documented in the Google JavaScript style guide.

`@param` and `@return` type annotations that have comments that do not fit on one line wrap to the next line and indent 
with one tab.

Example:

```Javascript
/**
 * A UI component allows users to select badges from their full list
 * of earned badges, displaying them in a container.
 * Expects a Badges.BadgeList as a model.
 */
Badges.DisplayCase = Backbone.View.extend({
    /**
     * Whether or not this is currently in edit mode and the full
     * badge list is visible.
     */
    editing: false,

    /**
     * The full user badge list available to pick from when in edit mode.
     * @type {Badges.UserBadgeList}
     */
    fullBadgeList: null,

    /**
     * Enters "edit mode" where badges can be added/removed.
     * @param {number=} index Optional index of the slot in the display-case
     *     to be edited. Defaults to the first available slot, or if none
     *     are available, the last used slot.
     * @return {Badges.DisplayCase} This same instance so calls can be
     *     chained.
     */
    edit: function(index) {
    …
    },
   ...
};

```
#### Core language rules

**Equality**

Prefer `===` (strict equality) to `==` due to the numerous oddities related to JavaScript's type coercion.

The only valid use of == is for comparing against null and undefined at the same time:

```Javascript
// Check null and undefined, but distinguish between other falsey values
if (someVariable == null) {
```

Though you will often want to just check against falsey values, and can just say `if (!someVariable) {...}`.

**Array and Object literals**

Always use `[]` and `{}` style literals to initialize arrays and objects, not the Array and Object constructors.

Array constructors are error-prone due to their arguments: `new Array(3)` yields `[undefined, undefined, undefined]`,
not `[3]`.

To avoid these kinds of weird cases, always use the more readable array literal.

Object constructors don't have the same problems, but follow the same rule for consistency with arrays. Plus, {} is 
more readable.

Use a new var statement for each declaration

Yes:
```Javascript
var a = "foo";
var b = a + "bar";
var c = fn(a, b);
```

No:
```Javascript
var a = "foo",
    b = a + "bar",
    c = fn(a, b);
```

A single var statement is bad because:

1. If you forget a comma, you just made a global
1. It originated when people wanted to save bytes, but we have a minifier
1. It makes line-based diffs/editing messier
1. It encourages C89-style declarations at the top of scope, preventing you from only declaring vars before first use, the latter preferable as it conveys intended scope to the reader

#### ES6/7 rules
1. Use backticks for strings because variables are easier to interpolate.
```Javascript
Yes:
let path = `${Config.ROOT}/collection/${collection.id}`;

No:
let path = Config.ROOT + '/collection/' + collection.id;
```
2. Use deconstructing where possible
```Javascript
Yes:
let {title, body, btnOk, btnOkClick, btnCancel, btnCancelClick} = this.props;

No:
let title = this.props.title;
let body = this.props.body;
let btnOk = this.props.btnOk;
let btnOkClick = this.props.btnOkClick;
let btnCancel = this.props.btnCancel;
let btnCancelClick = this.props.btnCancelClick;
```
3. Use arrow functions. When there is only one return use one line syntax
```Javascript
Yes:
foo(() => {...})

//When there is only one return use one line syntax
promise().then(response => response.body)

No:
foo(function() {...}.bind(this))
promise().then((response) => {
    return promise.body;
})
```
4. Use `let` and `const` instead of `var`
5. Use spread operators 

### Frameworks and libraries

#### React stack
* Use ES2015 classes
* Use static properties for defaultProps.
* Use an instance property for state.
* Autobind event handlers and callbacks.

Example:
```JSX
import React, {Component} from 'react';

class Foo extends Component {
    static defaultProps = {}

    state = {}

    handleClick = (e) => {
        // handle the click
    }
}
```

If state depends on props, define it in the constructor.

Example:
```JSX
class Bar extends Component {
    constructor(props) {
        super(props);   // must be called first
        this.state = {
            value: props.value,
        };
    }
}
```
* Use higher order components instead of mixins. ES6 style classes do not support mixins.

**Component method and property ordering**

Ordering within a React component is strict. The following example illustrates the precise ordering of various component 
methods and properties:

```JSX
class Foo extends Component {
    // Static properties
    static defaultProps = {}

    // The `constructor` method
    constructor() {
        super();
    }

    // Instance properties
    state = { hi: 5}

    // React lifecycle hooks.
    // They should follow their chronological ordering:
    // 1. componentWillMount
    // 2. componentDidMount
    // 3. componentWillReceiveProps
    // 4. shouldComponentUpdate
    // 5. componentWillUpdate
    // 6. componentDidUpdate
    // 7. componentWillUnmount
    componentDidMount() { ... }

    // The render method
    render() { ... }
    
    // All other instance methods and private properties
    _handleClick = (e) => { ... }
    
    _privateProp = null;
}
```
* Name handlers `handleEventName`

Example:
```JSX
<Component onClick={this.handleClick} onLaunchMissiles={this.handleLaunchMissiles} />
```

* Name handlers in props `onEventName`.

This is consistent with React's event naming: onClick, onDrag, onChange, etc.

Example:
```JSX
<Component onLaunchMissiles={this.handleLaunchMissiles} />
```

* Open elements on the same line.

Yes:
```JSX
return (<div>
   ...
</div>);
```
No:
```JSX
return (      // "div" is not on the same line as "return"
    <div>
        ...
    </div>
);

```
* Align HTML properties.

Fit them all on the same line if you can. If you can't, put first property on the line with the tag, and the rest on a 
line of its own, indented with 1 tab relative to previous line. The closing angle brace should be on a line of its own, 
indented the same as the opening angle brace. This makes it easy to see the props at a glance.

Yes:
```JSX
<div className="highlight" key="highlight-div">
<div className="highlight" 
    key="highlight-div"
>
<Image className="highlight"
    key="highlight-div"
/>
```
No:
```JSX
<div 
    className="highlight"      // first property not on the same line as element
    key="highlight-div"
>
<div                            
    className="highlight"
    key="highlight-div">        // closing brace not on its own line
```

**Ordering**

  - Ordering for `class extends React.Component`:

  1. optional `static` methods
  1. `constructor`
  1. `getChildContext`
  1. `componentWillMount`
  1. `componentDidMount`
  1. `componentWillReceiveProps`
  1. `shouldComponentUpdate`
  1. `componentWillUpdate`
  1. `componentDidUpdate`
  1. `componentWillUnmount`
  1. `componentDidCatch`
  1. `render`
  1. *clickHandlers or eventHandlers* like `_onClickSubmit()` or `_onChangeDescription()`
  1. *getter methods for `render`* like `_getSelectReason()` or `_getFooterContent()`
  1. *optional render methods* like `_renderNavigation()` or `_renderProfilePicture()`

  - How to define `propTypes`, `defaultProps`, `contextTypes`, etc...

```jsx
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Link extends Component {
    static _methodsAreOk = () => {
        return true;
    }

    // constructor
    constructor(props) {
        super(props)
    } 

    static propTypes = {
        id: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        text: PropTypes.string,
    };

    static defaultProps = {
        text: 'Hello World',
    };

    // Lifecycle methods

    getChildContext() {
        return {color: "purple"};
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {}

    shouldComponentUpdate(nextProps, nextState) {}

    componentWillUpdate(nextProps, nextState) {}

    componentDidUpdate(prevProps, prevState) {}

    componentWillUnmount() {}

    componentDidCatch(error, info) {}

    render() {
        return <a href={this.props.url} data-id={this.props.id}>{this.props.text}</a>;
    }

    // Other methods

    _onClickSubmit = () => {}

    _onMenuClick = () => {}    
}

export default Link;
```

**Language features**

Make "presentation" components pure. It's useful to think of the React world as divided into
 ["logic" components and "presentation" components.](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

"Logic" components have application logic, but do not emit HTML themselves. "Presentation" components are typically 
reusable, and do emit HTML.Logic components can have internal state, but presentation components never should.

**Prefer [props to state](https://reactjs.org/docs/state-and-lifecycle.html#what-components-should-have-state).**

You almost always want to use props. By avoiding state when possible, you minimize redundancy, making it easier to 
reason about your application. A common pattern — which matches the "logic" vs. "presentation" component 
distinction — is to create several stateless components that just render data, and have a stateful component above 
them in the hierarchy that passes its state to its children via props. 
The stateful component encapsulates all of the interaction logic, while the stateless components take care of rendering 
data in a declarative way.

**Never store state in the DOM**
Do not use `data-` attributes or classes. All information should be stored in JavaScript, either in the React component itself, or in a React store if using a framework such as Redux.

---

### Methods

- Use arrow functions to close over local variables.

```jsx
function ItemList(props) {
    return (
    <ul>
        {props.items.map((item, index) => (
        <Item
            key={item.key}
            onClick={() => doSomethingWith(item.name, index)}
        />
        ))}
    </ul>
    );
}
```

- Be sure to return a value in your `render` methods. eslint: [`react/require-render-return`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md)

Bad:
```jsx
render() {
    (<div />);
}
```
Good: 
```jsx
render() {
    return (<div />);
}
```
---

