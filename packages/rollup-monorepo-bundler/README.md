# @computerrock/rollup-monorepo-bundler

Rollup bundler for Lerna monorepo packages.

## Usage

Install package in your monorepo by running:

```sh
npm install @computerrock/rollup-monorepo-bundler
```

Then in your `package.json` file add:

```json
{
  "scripts": {
    "start": "rollup-monorepo-bundler start",
    "build": "rollup-monorepo-bundler build"
  }
}
```

### Package configuration

To configure which monorepo packages should be bundled with rollup-monorepo-bundler, install it and configure it in 
each package by modifying `package.json` and creating `rollup.config.js`:

```json
{
  "scripts": {
    "start": "rollup-monorepo-bundler start",
    "prepare": "rollup-monorepo-bundler prepare",
    "build": "rollup-monorepo-bundler build"
  }
}
```

At the moment only `external` is available for overwriting in `rollup.config.js`:

```js
// rollup.config.js
module.exports = {
    external: [],
};
```
