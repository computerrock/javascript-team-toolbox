# @computerrock/babel-preset-react-lib

This package contains Babel preset used for JavaScript/React libraries.

## Usage

Install package and peer dependencies by running:

```sh
$ npm install @babel/core@^7.1.0 @babel/runtime@^7.1.0
$ npm install @computerrock/babel-preset-react-lib@^2.1.0 --save-dev 
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
