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

```JSON
    // NODE.js system path
    "eslint.nodePath": "/usr/local/bin/node",
    
    // Run the linter on save (onSave) or on type (onType)    
    "eslint.run": "onType",

    // Turns auto fix on save on or off.
    "eslint.autoFixOnSave": true,
```