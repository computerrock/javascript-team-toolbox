# ComputerRock ESLint rules

## ESLint Requirements: 
* eslint
* eslint-plugin-import
* eslint-plugin-jsx-a11y
* eslint-plugin-react
* eslint-config-airbnb-base
* eslint-loader    // for webpack

---

## ESLint config backup:
> https://goo.gl/es8J5n

---

## VS Code settings for ESLint --fix
** Requires ESLint package **

```Javascript
    "editor.wordWrap": "wordWrapColumn",

    "editor.wordWrapColumn": 120,

    // NODE.js system path
    "eslint.nodePath": "/usr/local/bin/node",
    
    // Run the linter on save (onSave) or on type (onType)    
    "eslint.run": "onType",

    // Turns auto fix on save on or off.
    "eslint.autoFixOnSave": true,
```

## More (optional) ESLint Settings:
```Javascript
    // Render vertical rulers after a certain number of monospace characters. Use multiple values for multiple rulers. No rulers are drawn if array is empty
    "editor.rulers": [],
    // editor.rulers: [120] // if you want a ruler visible

    // Controls how the editor should render whitespace characters, possibilities are 'none', 'boundary', and 'all'. The 'boundary' option does not render single spaces between words.
    "editor.renderWhitespace": "none",

    // The number of spaces a tab is equal to. This setting is overriden based on the file contents when `editor.detectIndentation` is on.
    "editor.tabSize": 4,

    // Controls auto save of dirty files. Accepted values:  "off", "afterDelay", "onFocusChange" (editor loses focus), "onWindowChange" (window loses focus). If set to "afterDelay", you can configure the delay in "files.autoSaveDelay".
    "files.autoSave": "onFocusChange",
```

## ESLINT ENABLED/CUSTOM RULES - (specifications): 

**JAVASCRIPT**
* [arrow-parens](https://eslint.org/docs/rules/arrow-parens) 
* [arrow-body-style](https://eslint.org/docs/rules/arrow-body-style)
* [class-methods-use-this](https://eslint.org/docs/rules/class-methods-use-this)
* [comma-dangle](https://eslint.org/docs/rules/comma-dangle)
* [eol-last](https://eslint.org/docs/rules/eol-last)
* [global-require](https://eslint.org/docs/rules/global-require)
* [linebreak-style](https://eslint.org/docs/rules/linebreak-style)
* [no-console](https://eslint.org/docs/rules/no-console)
* [no-underscore-dangle](https://eslint.org/docs/rules/no-underscore-dangle)
* [no-unused-vars](https://eslint.org/docs/rules/no-unused-vars)
* [quote-props](https://eslint.org/docs/rules/quote-props)
* [one-var](https://eslint.org/docs/rules/one-var)
* [camelcase](https://eslint.org/docs/rules/camelcase)
* [operator-linebreak](https://eslint.org/docs/rules/operator-linebreak)
* [no-nested-ternary](https://eslint.org/docs/rules/no-nested-ternary)
* [object-curly-newline](https://eslint.org/docs/rules/object-curly-newline)
* [object-curly-spacing](https://eslint.org/docs/rules/object-curly-spacing)
* [indent](https://eslint.org/docs/rules/indent)
* [prefer-destructuring](https://eslint.org/docs/rules/prefer-destructuring)
* [prefer-const](https://eslint.org/docs/rules/prefer-const)
* [no-trailing-spaces](https://eslint.org/docs/rules/no-trailing-spaces)
* [max-depth](https://eslint.org/docs/rules/max-depth)
* [max-len](https://eslint.org/docs/rules/max-len)
* [key-spacing](https://eslint.org/docs/rules/key-spacing)
* [padded-blocks](https://eslint.org/docs/rules/padded-blocks)
* [newline-per-chained-call](https://eslint.org/docs/rules/newline-per-chained-call)

**REACT**
* [react/prop-types](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md)
* [react/jsx-key](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md)
* [react/boolean-prop-naming](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/boolean-prop-naming.md)
* [react/destructuring-assignment](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md)
* [react/forbid-component-props](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-component-props.md)
* [jsx-closing-bracket-location](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md)

**IMPORT**
* [import/no-mutable-exports](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md)
* [import/prefer-default-export](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md)
