# @computerrock/project-name

### Getting started 

This is custom Rollup bundled monorepo library template you can use to quickly bootstrap new library inside Lerna 
multi-application project. 

Modify `package.json` and `README.md` files  according to you project specification. Project specific code should 
be placed in `./src` folder. For more detailed explanation please consult `Project setup` document you can find 
in Computer Rock JavaScript team guides. 

## Bundling package

This library package can be built together with other library packages from Lerna monorepo level (recommended):

```shell
# to run packages configured for rollup bundling:
$ cd <lerna-root-directory>
$ npm run start-packages # starts rollup with watcher for all configured packages, or 
$ npm run build-packages # builds all configured packages (eg. for debugging)
```

You can also run bundler only for this package: 

```shell
$ npm start # starts rollup with watcher for the package 
$ npm run build # builds package with rollup
```

Files prepared for deployment will be placed in `./dist` folder of a package. 
