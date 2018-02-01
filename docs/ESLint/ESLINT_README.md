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