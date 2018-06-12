# @computerrock/eslint-config-react-native-app

This package contains shareable ESLint configuration used for React projects. It is based on Create React App [package](https://github.com/facebook/create-react-app) and [AirBnB style guide](https://github.com/airbnb/javascript).


## Usage

Install this package, ESLint and the necessary plugins.

```sh
npm install @computerrock/eslint-config-react-app babel-eslint@^8.2.3 eslint@^4.19.1 eslint-plugin-flowtype@^2.46.3 eslint-plugin-import@^2.11.0 eslint-plugin-jsx-a11y@^6.0.3 eslint-plugin-react@^7.7.0 eslint-plugin-react-native@^3.2.1
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

You can override the settings from `@computerrock/eslint-config-react-app` by editing the `.eslintrc` file. Learn more about [configuring ESLint](http://eslint.org/docs/user-guide/configuring) on the ESLint website.
