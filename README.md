# JavaScript Technology Team Toolbox

This project contains collection of packages used by Computer Rock JavaScript team in daily development. You can find 
them in [`./packages`](./packages) folder and use them as specified in package's `README.md` file.

## Project starter packs & new project initialization

For the fast and easy project initialization, and later easy upgrades and maintenance, we use 
[Toolchain CLI](https://github.com/Toolchain-JS/create-toolchain) project initialization utility. What follows is a 
quick start guide for each of the available project templates. For more details on what each template provides and how 
it is used please check created project's `README.md` file. 

### React application projects

In order to initialize new React app project you can run: 

```shell
$ npx create-toolchain my-project-name --template @computerrock/react-app
```

### Multi-application, multi-library monorepo projects

If project is more complex, and will contain multiple React applications which most certainly share some libraries and 
UI components, you can initialize Lerna monorepo project by running:

```shell
$ npx create-toolchain my-project-name --template @computerrock/lerna-monorepo
```

This will initialize Lerna monorepo project. Inside the monorepo's `./packages` folder then you can initialize as many 
React application projects as you may need.

Monorepo project will also be configured for bundling shared monorepo packages with Rollup. In order to add shared 
library package you can run:

```shell
$ npx create-toolchain my-project-name --template @computerrock/rollup-monorepo-library
```

### Project starter packages

Packages implementing project initialization commands are:

* [`@computerrock/toolchain-react-app`](https://www.npmjs.com/package/@computerrock/toolchain-react-app)
* [`@computerrock/tjs-template-react-app`](https://www.npmjs.com/package/@computerrock/tjs-template-react-app)
* [`@computerrock/toolchain-rollup-monorepo-library`](https://www.npmjs.com/package/@computerrock/toolchain-rollup-monorepo-library)
* [`@computerrock/tjs-template-rollup-monorepo-library`](https://www.npmjs.com/package/@computerrock/tjs-template-rollup-monorepo-library)
* [`@computerrock/toolchain-lerna-monorepo`](https://www.npmjs.com/package/@computerrock/toolchain-lerna-monorepo)
* [`@computerrock/tjs-template-lerna-monorepo`](https://www.npmjs.com/package/@computerrock/tjs-template-lerna-monorepo)


## Supporting packages

For all projects we use and centrally maintain several supporting packages. These include various presets, configs,
tools, and other reusable project components. This saves us time configuring, maintaining and keeping projects up to date.

Packages available:

* [`@computerrock/babel-preset-react-app`](https://www.npmjs.com/package/@computerrock/babel-preset-react-app)
* [`@computerrock/babel-preset-react-lib`](https://www.npmjs.com/package/@computerrock/babel-preset-react-lib)
* [`@computerrock/eslint-config-base`](https://www.npmjs.com/package/@computerrock/eslint-config-base)
* [`@computerrock/eslint-config-react-app`](https://www.npmjs.com/package/@computerrock/eslint-config-react-app)
* [`@computerrock/eslint-config-react-native-app`](https://www.npmjs.com/package/@computerrock/eslint-config-react-native-app)
* [`@computerrock/react-app-polyfill`](https://www.npmjs.com/package/@computerrock/react-app-polyfill)
* [`@computerrock/react-dev-utils`](https://www.npmjs.com/package/@computerrock/react-dev-utils)
* [`@computerrock/react-native-babel-transformer`](https://www.npmjs.com/package/@computerrock/react-native-babel-transformer)
* [`@computerrock/rollup-monorepo-bundler`](https://www.npmjs.com/package/@computerrock/rollup-monorepo-bundler)
* [`@computerrock/storybook-preset-react-app`](https://www.npmjs.com/package/@computerrock/storybook-preset-react-app)
* [`@computerrock/stylelint-config-react-app`](https://www.npmjs.com/package/@computerrock/stylelint-config-react-app)