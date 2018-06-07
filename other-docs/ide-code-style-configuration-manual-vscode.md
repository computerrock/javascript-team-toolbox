# VSCode code style configuration

Here are some ease of life settings for VS Code editor. While we have ESLint configured in projects for auto
fixing, it is a bit easier when editor auto-complete settings follow same rules. 

#### Editor > General code style settings

```JS
    // Code max width in characters
    "editor.wordWrapColumn": 120,

     // The number of spaces a tab is equal to. This setting is overriden based on the file contents when `editor.detectIndentation` is on.
    "editor.tabSize": 4,

    // Controls auto save of dirty files. Accepted values: "off", "afterDelay", "onFocusChange" (editor loses focus), "onWindowChange" (window loses focus). If set to "afterDelay", you can configure the delay in "files.autoSaveDelay".
    "files.autoSave": "onFocusChange",

    // Path to the git executable
    "git.path": "/usr/bin/git",

    "[html]": {
        "editor.formatOnSave": true,
        "editor.formatOnPaste": true,
        "editor.tabSize": 4,
        "editor.foldingStrategy": "indentation",
    },

    "[css]": {
        "editor.formatOnSave": true,
        "editor.formatOnPaste": true,
        "editor.tabSize": 4,
    },

    "[scss]": {
        "editor.formatOnSave": true,
        "editor.formatOnPaste": true,
        "editor.tabSize": 4,
    },

    "[javascript]": {
        "editor.formatOnSave": false,
        "editor.formatOnPaste": false,
        "editor.tabSize": 4,
    },

    "[json]": {
        "editor.formatOnSave": true,
        "editor.formatOnPaste": true,
        "editor.tabSize": 2,
    },

    "[markdown]": {
        "editor.formatOnSave": true,
        "editor.wordWrap": "on",
        "editor.renderWhitespace": "all",
        "editor.acceptSuggestionOnEnter": "off"
    },
```

#### Editor > ESLint settings
**REQUERED: Eslint extension**

```JS
    // Node package manager
    "eslint.packageManager": "yarn",
    // Node path
    "eslint.nodePath": "/Users/alekz/.nvm/versions/node/v9.11.1/bin/node",
    // Run the linter on save (onSave) or on type (onType)
    "eslint.run": "onType",
    // Turns auto fix on save on or off.
    "eslint.autoFixOnSave": true,
    // "editor.formatOnSave": false,
    "eslint.alwaysShowStatus": true,
```

#### Editor > Recommended settings for cleaner workspace

```JS
    // Controls how lines should wrap. Can be:
    // - 'off' (disable wrapping),
    // - 'on' (viewport wrapping),
    // - 'wordWrapColumn' (wrap at `editor.wordWrapColumn`) or
    // - 'bounded' (wrap at minimum of viewport and `editor.wordWrapColumn`).
    "editor.wordWrap": "wordWrapColumn",

        // Controls if the minimap is shown
    "editor.minimap.enabled": false,

    // this lets you quickly open multiple items in a row and not have the previous ones closed on you
    "workbench.editor.enablePreviewFromQuickOpen": false,

    // Hide files & folders from sidebar for less cluttered look
    "files.exclude": {
        "**/.git": true,
        "**/.svn": true,
        "**/.hg": true,
        "**/CVS": true,
        "**/.DS_Store": true,
        "**/node_modules": true,
        "**/.idea": true,
    },
    
    // Do not search in these folders
    "search.exclude": {
        "**/.git": true,
        "**/node_modules": true,
        "**/bower_components": true,
        "**/tmp": true,
        "**/dist": true,
        "**/dev": true,
    },
```

#### Useful VS Code packages that will help you in your workflow

- ESlint
- Stylelint

[optional] 

- Babel Javascript
- Auto Close Tag
- Auto Rename Tag
- Document This
- Git Lens
- IntelliSense for CSS class names in HTML
- Path Inteliisense
- Terminal
- TODO Hightlight
- Syncing
- SCSS IntelliSense
- Sass Yah