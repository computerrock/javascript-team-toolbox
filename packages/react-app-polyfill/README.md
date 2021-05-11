# @computerrock/react-app-polyfill

This package provides polyfills for commonly used language features. It is based on Create React App 
[package](https://github.com/facebook/create-react-app).<br>

### Usage

Install package by running:

```sh
npm install @computerrock/react-app-polyfill
```

## Polyfilling language features

You can polyfill stable language features not available in your target browsers:
 
```js
// must be the first line in src/index.js
import 'react-app-polyfill/stable';

// ...
```

## Supporting Internet Explorer

These modules ensure the following language features are present:

1. `Promise` (for `async` / `await` support)
1. `window.fetch` (a Promise-based way to make web requests in the browser)
1. `Object.assign` (a helper required for Object Spread, i.e. `{ ...a, ...b }`)
1. `Symbol` (a built-in object used by `for...of` syntax and friends)
1. `Array.from` (a built-in static method used by array spread, i.e. `[...arr]`)

You can import the entry point for the minimal version you intend to support to ensure that
 the minimum language features are present that are required: 

```js
// This must be the first line in src/index.js
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

// ...
```

or:

```js
// This must be the first line in src/index.js
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

// ...
```
