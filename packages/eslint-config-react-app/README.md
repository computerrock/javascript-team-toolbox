# @computerrock/eslint-config-react-app

This package contains shareable ESLint configuration used for React projects.

This package is extended by `@computerrock/eslint-config-react-native-app`.


## Usage

Install:

```sh
$ npm install @computerrock/eslint-config-react-app --save-dev
```

Create a file named `.eslintrc` with following contents in the root folder of your project:

```json
{
    "extends": "@computerrock/eslint-config-react-app",
    "rules": {
        "valid-jsdoc": "warn",
        "require-jsdoc": "off"
    }
}
```

You can override the settings from `@computerrock/eslint-config-react-app` by editing the `.eslintrc` file. Learn more 
about [configuring ESLint](http://eslint.org/docs/user-guide/configuring) on the ESLint website.
