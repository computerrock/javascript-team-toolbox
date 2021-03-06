// @remove-file-on-eject
'use strict';

const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: [require.resolve('@computerrock/babel-preset-react-app')],
  babelrc: false,
  configFile: false,
});
