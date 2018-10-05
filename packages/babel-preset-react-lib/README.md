# @computerrock/babel-preset-react-lib

This package contains Babel preset used for JavaScript/React libraries.

## Usage

Install package and peer dependencies by running:

```sh
$ npm install babel-core@^7.0.0-bridge.0 @babel/core@^7.0.0 @babel/runtime@^7.0.0 --save-dev 
$ npm install @computerrock/babel-preset-react-lib@^2.0.0 --save-dev 
```

Create a file named `.babelrc` with following contents in the root folder of your project:

```json
{
  "presets": ["@computerrock/babel-preset-react-lib"]
}
```

This preset uses the `useBuiltIns` option with 
[transform-object-rest-spread](http://babeljs.io/docs/plugins/transform-object-rest-spread/) 
and [transform-react-jsx](http://babeljs.io/docs/plugins/transform-react-jsx/), which assumes 
that `Object.assign` is available or polyfilled.
