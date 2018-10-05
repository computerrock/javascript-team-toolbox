# @computerrock/eslint-config-react-native-app

This package contains shareable ESLint configuration used for React projects. It is based on Create React App 
[package](https://github.com/facebook/create-react-app) and [AirBnB style guide](https://github.com/airbnb/javascript).


## Usage

Install this package, ESLint and the necessary plugins.

```sh
$ npm install eslint@^5.6.0 babel-eslint@^10.0.0 --save-dev
$ npm install eslint-plugin-import@^2.14.0 eslint-plugin-react@^7.11.0 eslint-plugin-react-native@^3.3.0 eslint-plugin-jsx-a11y@^6.1.0 --save-dev
$ npm install @computerrock/eslint-config-react-native-app --save-dev
```

Create a file named `.eslintrc` with following contents in the root folder of your project:

```json
{
    "extends": "@computerrock/eslint-config-react-native-app",
    "rules": {
        "valid-jsdoc": "warn",
        "require-jsdoc": "off"
    }
}
```

You can override the settings from `@computerrock/eslint-config-react-app` by editing the `.eslintrc` file. Learn more 
about [configuring ESLint](http://eslint.org/docs/user-guide/configuring) on the ESLint website.
