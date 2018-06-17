# @computerrock/stylelint-config-react-app

This package contains shareable stylelint configuration used for React projects. 

## Usage

Install this package, stylelint and the necessary plugins.

```sh
$ npm install stylelint@^9.2.1 stylelint-webpack-plugin@^0.10.5 stylelint-scss@^3.1.0 stylelint-selector-bem-pattern@^2.0.0 --save-dev
$ npm install @computerrock/stylelint-config-react-app --save-dev
```

Create a file named `.stylelintrc` with following contents in the root folder of your project:

```json
{
    "extends": "@computerrock/stylelint-config-react-app",
    "rules": {}
}
```

You can override the settings from `@computerrock/stylelint-config-react-app` by editing the `.stylelintrc` file. Learn more about [configuring stylelint](https://stylelint.io/user-guide/configuration/) on the stylelint website.
