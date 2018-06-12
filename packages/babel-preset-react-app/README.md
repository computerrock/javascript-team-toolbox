# @computerrock/babel-preset-react-app

This package contains Babel preset used for JavaScript projects. It is based on Create React App [package](https://github.com/facebook/create-react-app)

## Usage

Install package and peer dependencies by running:

```sh
npm install @computerrock/babel-preset-react-app  @babel/core@7.0.0-beta.49 @babel/runtime@7.0.0-beta.49 babel-core@7.0.0-bridge.0 babel-loader@8.0.0-beta.0
```

Create a file named `.babelrc` with following contents in the root folder of your project:

```json
{
  "presets": ["@computerrock/babel-preset-react-app"]
}
```

This preset uses the `useBuiltIns` option with [transform-object-rest-spread](http://babeljs.io/docs/plugins/transform-object-rest-spread/) and [transform-react-jsx](http://babeljs.io/docs/plugins/transform-react-jsx/), which assumes that `Object.assign` is available or polyfilled.
