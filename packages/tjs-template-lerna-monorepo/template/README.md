# @computerrock/project-name

### Getting started 

This is custom Lerna monorepo template you can use to quickly bootstrap new multi-application project. 

Modify `package.json` and `README.md` files  according to you project specification. Project specific packages should 
be placed in `./packages` folder. For more detailed explanation please consult `Project setup` document you can find 
in Computer Rock JavaScript team guides. 

## Development builds

In folder for each of the web applications you first need to create `.env.development` files (see `.env.example`
for reference). After, you can install dependencies and run project as described:

```shell
# Installation process starts in monorepo project root folder:
$ npm install # to install monorepo supporting packages
$ lerna bootstrap # to install node modules in each of the packages and link dependent packages

# to run packages configured for rollup bundling:
$ npm run start-packages # starts rollup with watcher for all configured packages, or 
$ npm run build-packages # builds all configured packages (eg. for debugging)

# to run any of the apps, in each app folder:
$ cd app-folder-name
$ npm start # starts the web app with development environment settings
$ npm test # runs Jest test suite (in separate terminal)
```
Applications will be accessible at URLs starting at 11XXX PORT: [http://localhost:11070](http://localhost:11XXX/). Please
refer to each of the *.env*  example configurations files for exact `PORT` value set for the app.

Applications and indirectly `@ace-de/ui-components` package are build with Webpack. Service client packages are configured
to be built with Rollup. Configuration steps are described in [@computerrock/rollup-monorepo-bundler](https://www.npmjs.com/package/@computerrock/rollup-monorepo-bundler).

## Publishing packages

In order to publish supporting packages you first need to have account opened on [npmjs.com](https://www.npmjs.com/) and 
added to project scope. You will also need to sign in at least once with this account on your development machine:

```bash
$ npm login # logs you in with npm and adds access token to ~/.npmrc

$ lerna publish # start lerna publishing process.
```

During publishing process, Lerna will ask for package new version number. Then it will update version numbers for all 
inter-dependent packages and publish them on npm.js. Version tags will be also created and pushed to git. For more 
detailed process description and additional options please check Lerna documentation [here](https://github.com/lerna/lerna/tree/main/commands/publish).

## Production builds

In folder for each of the web applications you first need to create `.env.production` files (see `.env.example`
for reference). After, you can install dependencies and build static files as described:

```bash
# to build static files for deployment of any of the web apps, in each app folder run:
$ cd app-folder-name
$ npm install # installs project dependencies (needed if running outside Lerna context, ie CI system)
$ npm run build # builds the app with production environment settings
```

Files prepared for deployment will be placed in `./build` folder of each app. 
