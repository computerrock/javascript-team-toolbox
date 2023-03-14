# PhpStorm/Webstorm code style configuration

Here are some ease of life settings for JetBrains IDEs. While we have ESLint and Prettier configured in projects for auto
fixing, it is a bit easier when IDE auto-complete settings follow same rules. 


#### Editor > General > Auto Import 

Uncheck all boxes for JavaScript. IDE is not aware of set Webpack aliases and set imports paths to long relative values.


#### Editor > Code Style > HTML

Section `Other`:

* In `Spaces` check `In empty tag`
* New line before first attribute, select `When multiline`
* New line after last attribute, select `When multiline`
* Add for JSX attributes, select `Based on type`


#### Editor > Code Style > CSS

Section `Other`:

* Convert hex colors to, check `Lower case`


#### Editor > Code Style > SCSS

Section `Tabs and Indents`

* Tab size, set 4
* Indent size, set 4
* Continuation indent, set 4


#### Editor > Code Style > JavaScript

Section `Punctuation`: 

* `Use` semicolon to terminate statements `always`
* Use `single` quotes `always`
* Trailing comma: `Add when multiline`


#### Editor > Code Style > JSON

Section `Tabs and Indents`

* Tab size, set 2
* Indent size, set 2
