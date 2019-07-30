# Project setup guide

Here, we go over steps to start new JavaScript project and explain some parts of project configuration for 
React based projects.


## Project initialization

The easiest way to start new project is by using starter packs provided in this toolbox. Initialize the project by 
following next steps:

* Go to your `Project` directory and create new folder for the project. We always name projects in lower kebab case: 

```bash
$ cd ~/Projects
$ mkdir project-name-here
``` 

* Copy all contents (except `node_modules`!) from starter pack folder `./packages/starter-*`, into newly created 
project folder. For example you can use [`starter-react-app`](./packages/starter-react-app).

* Open `package.json` file and change `name`, `description` and `repository` fields according to project specification. 
Project name should be scoped with `@comrock`, example: `@comrock/project-name-here`.

* Also in `package.json`, change version number to `1.0.0`. We always start with first stable version number.

* Follow instructions from `README.md` document to enable project for development.

* Run `npm install` to bootstrap project, and then start it with `npm start`. Check browser to see if everything is working.

* Change `README.md` document according to project specification. Maintain all contribution related information here. 
New developer on project should be able to be up and running with the project just by following instructions in 
the document.

* Initialize `git` by running:

```bash
$ git init
$ git add .
$ git commit -m "initialize project"
$ git remote add origin PUT_PROJECT_SSH_GIT_ADDRESS_HERE
$ git push -u origin master
```

* Create `develop` branch (according to [`Project delivery process`](./project-delivery-process.md) guidelines):

```bash
$ git checkout -b develop origin/master
$ git push origin develop
```

And that's it. Your project is set and ready for use!


## React project folder structure overview 

This is an overview of folder structure in latest version of base React starter pack.

```
project-name
    config/
        jest/
        paths.js
        polyfills.js
        webpack.config.dev.js
        wepack.config.prod.js
    node_modules/
    public/
        favicon.ico
        index.html 
        manifest.json
    scripts/
        build.js
        start.js
        test.js
    src/
        App.js
        App.scss
        App.spec.js
        index.js
        index.scss
        logo.svg
        registerServiceWorker.js
    .babelrc
    .env.development
    .env.example
    .eslintrc
    .gitignore
    .stylelintrc
    jest.config.js
    README.md
    package.json
    package-lock.json
```

* `src/` is where the project source code lives. 

* `public/` contains `index.html`, favicon and other static files used by main `.html` file.

* in `scripts/` are `npm` runnable scripts:

    * `start.js` is used for starting local, development, instance of project on some localhost port set in 
    `.env.development` file. Local build is accessible on [http://localhost:PORT](http://localhost:PORT);
    * `test.js` is used for starting test runner;
    * `build.js` is used for building deployment version of code. Resulting files will be placed in `build/` folder.
    
* scripts use configuration placed in `config/` folder. Feel free to modify and upgrade them according to project needs. 
  Here we have:
  
    * `paths.js` containing all the paths used by scripts and other config files;
    * `pollyfills.js` file that contains all the polyfill implementations injected into the project;
    * `webpack.config.dev.js`, Webpack configuration for local development;
    * `webpack.config.prod.js`, Webpack configuration for deploying project.

* we also have:

    * `package.json` file for `npm` package related configuration;
    * `node_modules/` and `package-lock.json` containing `npm` installed packages and related information;    
    * `.gitignore`;
    * ...and rest of the files that will be described in next sections of this document.


## Standard libraries used on projects

### Redux

On projects we use [*Redux*](https://redux.js.org/) as predictable application state container. For handling side 
effects we primarily use [`redux-saga`](https://redux-saga.js.org/). For smaller/simple projects we use 
[`redux-thunk`](https://github.com/reduxjs/redux-thunk).

### `react-router`

Routing in applications is handled by [`react-router`](https://github.com/ReactTraining/react-router) connected with 
Redux using `react-router-redux` package.

### Immutable.js

[*Immutable.js*](https://facebook.github.io/immutable-js/) provides Persistent Immutable data structures: List, Stack, 
Map, OrderedMap, Set, OrderedSet and Record. Immutable data cannot be changed once created, leading to much simpler 
application development, no defensive copying, and enabling advanced memoization and change detection techniques with 
simple logic. Persistent data presents a mutative API which does not update the data in-place, but instead always 
yields new updated data.

### moment.js
 
For parsing, manipulating, and display of dates and times we use [*moment.js*](https://momentjs.com/).


## Webpack configuration for React projects

This is an overview of [*Webpack*](https://webpack.js.org/) configuration for React projects and latest version of 
base React starter pack. 

> This chapter contains overview for configurations done in `starter-react-app` package. There is no need to
> do any additional configuration steps if you use starter package. Contents is purely educational and none of the 
> given commands is meant for running. If you do need to make project from scratch, please refer to documentation
> of linked packages and projects.

### React dev utils

React starter pack is based on [Create React App](https://github.com/facebook/create-react-app) and it also uses 
`react-dev-utils` package. Utility functions defined in package are used in npm scripts and build configuration files.
To have more control over build process we cloned it. It is installed by running:

```sh
$ npm install @computerrock/react-dev-utils
```

### `.env` app configuration files
    
Project environment related configuration is imported from `.env` files. Each project should have `.env.example` file
containing all the possible values to be set and documentation in comments. Needed packages are installed by running:

```sh
$ npm install dotenv dotenv-expand
```

Webpack is configured to inject `.env` variables into project source like this:

```
const InterpolateHtmlPlugin = require('@computerrock/react-dev-utils/InterpolateHtmlPlugin');
const clientEnvironment = {NODE_ENV: process.env.NODE_ENV || 'development', PUBLIC_URL: ''};
module.exports = {
    plugins: {
        // make environment variables available in index.html
        new InterpolateHtmlPlugin(Object.keys(process.env).reduce((env, key) => {
            env[key] = process.env[key];
            return env;
        }, clientEnvironment)),
        // make environment variables available in application code
        new webpack.DefinePlugin({
            'process.env': Object.keys(process.env).reduce((env, key) => {
                env[key] = JSON.stringify(process.env[key]);
                return env;
            }, clientEnvironment),
        }),
    },
};
```


### Babel loader

[*Babel*](https://babeljs.io/) is used for transpilling latest ECMAScript code into browser compatible version. We use 
custom babel preset that is set according to our projects. Loader and related packages are installed by running:

```sh
$ npm install babel-loader @babel/core @babel/runtime
$ npm install @computerrock/babel-preset-react-app
```

Babel preset is configured in `.babelrc` file located in project root:

```json
{
  "presets": ["@computerrock/babel-preset-react-app"]
}
```

Loader is added to `oneOf` module rules section of webpack config files:

```
const paths = require('./paths');
module.exports = {
    module: {
        rules: [
            {
                oneOf: [
                    // js/jsx
                    {
                        test: /\.(js|jsx|mjs)$/,
                        include: paths.appSrc,
                        loader: require.resolve('babel-loader'),
                        options: {
                            cacheDirectory: true,
                        },
                    },
                ],
            },
        ],
    },
};
```


### ESLint code validation

For validating best code practices, avoiding possible errors and checking code style we use [ESLint](https://eslint.org/). 
We connect ESLint and Webpack using `eslint-loader`. Loader and related packages are installed by running:

```sh
$ npm install eslint-loader eslint babel-eslint
$ npm install eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y
$ npm install @computerrock/eslint-config-react-app
```

We use custom ESLint configuration packages, added in `.eslintrc` file in root folder of the project:

```json
{
    "extends": "@computerrock/eslint-config-react-app",
    "rules": {
        "valid-jsdoc": "warn",
        "require-jsdoc": "off"
    }
}
```

> Instead of `@computerrock/eslint-config-react-app` depending on project you may also use `@computerrock/eslint-config-base`
> or `@computerrock/eslint-config-react-native-app`.

Loader is added to rules section of webpack config files:

```
const eslintFormatter = require('@computerrock/react-dev-utils/eslintFormatter');
module.exports = {
    module: {
        rules: [
            // eslint
            {
                test: /\.(js|jsx|mjs)$/,
                enforce: 'pre',
                use: [
                    {
                        loader: require.resolve('eslint-loader'),
                        options: {
                            formatter: eslintFormatter,
                            eslintPath: require.resolve('eslint'),
                            fix: true,
                        },
                    },
                ],
                include: paths.appSrc,
            },
        ],
    },
};
```


### *Jest* testing

We use [*Jest*](https://facebook.github.io/jest/) as testing platform together with [*Enzyme*](http://airbnb.io/enzyme/). 
Installed with: 

```sh
$ npm install jest babel-jest enzyme enzyme-adapter-react-16
```

Test runner is started using `test.js` npm script. Jest is configured in `jest.config.js` file placed in project root. 
Additional configuration files are in `config/jest/` folder.


### Style loader 

For handling styles (Sass/SCSS/CSS) we use whole set of loaders installed with:

```sh
$ npm install style-loader css-loader autoprefixer postcss-loader postcss-flexbugs-fixes
$ npm install sass-loader node-sass resolve-url-loader
```

Loaders are added to `oneOf` module rules section of webpack config files:

```
module.exports = {
    module: {
        rules: [
            {
                oneOf: [
                    // styles
                    {
                        test: /\.(css|scss)$/,
                        use: [
                            require.resolve('style-loader'),
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    importLoaders: 1,
                                    sourceMap: true,
                                },
                            },
                            {
                                loader: require.resolve('postcss-loader'),
                                options: {
                                    ident: 'postcss',
                                    sourceMap: true,
                                    plugins: () => [
                                        require('postcss-flexbugs-fixes'),
                                        autoprefixer({
                                            browsers: [
                                                '>1%',
                                                'last 4 versions',
                                                'Firefox ESR',
                                                'not ie < 9',
                                            ],
                                            flexbox: 'no-2009',
                                        }),
                                    ],
                                },
                            },
                            {
                                loader: require.resolve('resolve-url-loader'),
                                options: {
                                    keepQuery: true,
                                },
                            },
                            {
                                loader: require.resolve('sass-loader'),
                                options: {
                                    sourceMap: true,
                                    sourceMapContents: true,
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
};
```


### *stylelint* code validation

For validating best code practices, avoiding possible errors and checking code style we use [stylelint](https://stylelint.io/). 
We connect stylint and Webpack using `stylelint-webpack-plugin`. Plugin and related packages are installed by running:

```sh
$ npm install stylelint stylelint-webpack-plugin stylelint-scss stylelint-selector-bem-pattern
$ npm install @computerrock/stylelint-config-react-app
```

We use custom stylelint configuration package, added in `.stylelintrc` file in root folder of the project:

```json
{
  "extends": ["@computerrock/stylelint-config-react-app"],
  "rules": {}
}
```

Plugin is added to plugins section of webpack config files:

```
const StyleLintPlugin = require('stylelint-webpack-plugin');
module.exports = {
    plugins: {
        // lint styles
        new StyleLintPlugin({
            syntax: 'scss',
            fix: false,
        }),
    },
};
```


### SVG loader

On projects SVG files are handled with set of svg loaders and `svg-sprite-loader` plugin. Plugin and related packages 
are installed by running:

```sh
$ npm install svg-sprite-loader svg-transform-loader svgo svgo-loader svgxuse
```

Loaders and plugin are added to webpack config files:

```
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
module.exports = {
    module: {
        rules: [
            {
                oneOf: [
                    // svg
                    {
                        test: [/\.svg$/],
                        use: [
                            {
                                loader: require.resolve('svg-sprite-loader'),
                                options: {
                                    symbolId: 'svg-[name]',
                                    extract: true,
                                    spriteFilename: 'media/sprite.[hash:8].svg',
                                    esModule: false,
                                },
                            },
                            require.resolve('svg-transform-loader'),
                            require.resolve('svgo-loader'),
                        ],
                    },
                ],
            },
        ],
    },
    plugins: {
        // SVG sprite loader
        new SpriteLoaderPlugin(),
    },
};
```

To properly support SVGs IE10/11 next line should be added in project's `index.js` file:

```js
import 'svgxuse'; // fixes IE10/11 issue when using external SVG
```


### Static media loader

For handling static media files we use next webpack loaders: 

```sh
$ npm install url-loader file-loader fs-extra 
```

Loaders are added to `oneOf` module rules section of webpack config files:

```
const paths = require('./paths');
module.exports = {
    module: {
        rules: [
            {
                oneOf: [
                    // media
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: 'media/[name].[hash:8].[ext]',
                        },
                    },
                    // catch all
                    {
                        exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.svg$/],
                        loader: require.resolve('file-loader'),
                        options: {
                            name: 'media/[name].[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },
};
```
