# @computerrock/eslint-config-base

This package contains shareable ESLint configuration used for JavaScript projects. It is based on Create React App 
[package](https://github.com/facebook/create-react-app) and [AirBnB style guide](https://github.com/airbnb/javascript).

This package is extended by `@computerrock/eslint-config-react-app` and `@computerrock/eslint-config-react-native-app`.

## Usage

Install this package, ESLint and the necessary plugins.

```sh
$ npm install eslint@^4.19.0 babel-eslint@^8.2.0 --save-dev
$ npm install eslint-plugin-import@^2.11.0 --save-dev
$ npm install @computerrock/eslint-config-base --save-dev
```

Create a file named `.eslintrc` with following contents in the root folder of your project:

```json
{
    "root": true,
    "extends": "@computerrock/eslint-config-base",
    "rules": {
        "valid-jsdoc": "warn",
        "require-jsdoc": "off"
    }
}
```

You can override the settings from `@computerrock/eslint-config-base` by editing the `.eslintrc` file. Learn more 
about [configuring ESLint](http://eslint.org/docs/user-guide/configuring) on the ESLint website.
