# @computerrock/babel-preset-react-app

This package contains Babel preset used for JavaScript/React application projects. It is based on Create React App 
[package](https://github.com/facebook/create-react-app)

## Usage

Install package and peer dependencies by running:

```sh
$ npm install @babel/core@^7.4.3 @babel/runtime-corejs3@^7.4.3
$ npm install core-js@^3.0.1 regenerator-runtime@^0.13.2
$ npm install @computerrock/babel-preset-react-app@^2.1.0 --save-dev 
```

Create a file named `.babelrc` with following contents in the root folder of your project:

```json
{
  "presets": ["@computerrock/babel-preset-react-app"]
}
```

This preset uses the `useBuiltIns` option with 
[transform-object-rest-spread](http://babeljs.io/docs/plugins/transform-object-rest-spread/) 
and [transform-react-jsx](http://babeljs.io/docs/plugins/transform-react-jsx/), which assumes 
that `Object.assign` is available or polyfilled.
