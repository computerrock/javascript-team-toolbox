# starter-react-lib

This is a starter pack that you can use to quickly create new library with latest configuration.


## Getting started 

Copy the contents of this folder into new library folder. Modify `package.json`, `README.md`, and `rollup.config.js` 
files  according to you project specification. Library specific code should be placed in `./src` folder. 


## Builds

```bash
$ npm start # run to build the lib with watcher
$ npm run watch # same, just more standard (eg. used by lerna)
```


## Publishing

By default `package.json` has `private` mode turned on. Before publishing this field needs to be removed 
and `publishConfig` set instead.
