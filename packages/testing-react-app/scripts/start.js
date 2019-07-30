'use strict';

// set environment
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// exit on unhandled rejections
process.on('unhandledRejection', err => {
    throw err;
});

// SSR
const argv = require('yargs').argv;
const isSSREnabled = typeof argv['with-ssr'] !== 'undefined' ? true : '';
process.env.SSR_ENABLED = isSSREnabled;

// load env variables
require('../config/env');

const chalk = require('chalk');
const webpack = require('webpack');
const express = require('express');
const history = require('connect-history-api-fallback');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const clearConsole = require('@computerrock/react-dev-utils/clearConsole');
const checkRequiredFiles = require('@computerrock/react-dev-utils/checkRequiredFiles');
const formatWebpackMessages = require('@computerrock/react-dev-utils/formatWebpackMessages');
const {choosePort} = require('@computerrock/react-dev-utils/WebpackDevServerUtils');
const webpackUniversalAppMiddleware = require('../server/webpackUniversalAppMiddleware');
const paths = require('../config/paths');
const config = require('../config/webpack.config.dev');
const serverConfig = require('../config/webpack.config.server-dev');

// warn and exit if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appServerJs])) {
    process.exit(1);
}

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const isInteractive = process.stdout.isTTY;

if (process.env.HOST) {
    console.log(
        chalk.cyan(
            `Attempting to bind to HOST environment variable: ${chalk.yellow(
                chalk.bold(process.env.HOST)
            )}`
        )
    );
    console.log(`If this was unintentional, check that you haven't mistakenly set it in your shell.`);
    console.log(`Learn more here: ${chalk.yellow('http://bit.ly/2mwWSwH')}`);
    console.log();
}

choosePort(HOST, DEFAULT_PORT)
    .then(port => {
        if (port == null) {
            return;
        }

        // create webpack compiler
        let compiler;
        try {
            if (isSSREnabled) {
                compiler = webpack([config, serverConfig]);
            } else {
                compiler = webpack(config);
            }
        } catch (err) {
            console.log(chalk.red('Failed to compile.'));
            console.log();
            console.log(err.message || err);
            console.log();
            process.exit(1);
        }

        // on webpack invalidation display pending status
        compiler.plugin('invalid', () => {
            if (isInteractive) {
                clearConsole();
            }
            console.log('Compiling...');
        });

        // on webpack compile display result status and formatted stats
        compiler.plugin('done', stats => {
            if (isInteractive) {
                clearConsole();
            }

            const messages = formatWebpackMessages(stats.toJson({}, true));
            const isSuccessful = !messages.errors.length && !messages.warnings.length;
            if (isSuccessful) {
                console.log(chalk.green('Compiled successfully!'));
                console.log();
                console.log(chalk.gray(`Listening on http://localhost:${port}`));
                console.log();
            }

            // if errors exist, only show errors
            if (messages.errors.length) {
                console.log(chalk.red('Failed to compile.\n'));
                console.log(messages.errors.join('\n\n'));
                console.log();
                return;
            }

            // show warnings if no errors were found
            if (messages.warnings.length) {
                console.log(chalk.yellow('Compiled with warnings.\n'));
                console.log(messages.warnings.join('\n\n'));
                console.log();
            }
        });

        // initialize dev server
        const devServer = express();

        // history fallback
        if (!isSSREnabled) {
            devServer.use(history());
        }

        // configure WebpackDevMiddleware
        devServer.use(WebpackDevMiddleware(compiler, {
            compress: true,
            contentBase: paths.appPublic,
            watchContentBase: true,
            publicPath: config.output.publicPath,
            // enable hot reloading
            hot: true,
            // display only error messages, formatted warning stats will be shown in terminal
            logLevel: 'error',
            quiet: true,
            // do not watch node_modules
            watchOptions: {
                ignored: /node_modules/,
            },
            // allow period symbol in paths
            historyApiFallback: {
                disableDotRule: true,
            },
            // enable server side rendering
            // index needs to be falsy due to incompatibility with HtmlWebpackPlugin:
            // https://github.com/webpack/webpack-dev-middleware/issues/142
            serverSideRender: isSSREnabled,
            index: isSSREnabled ? false : 'index.html',
        }));

        // configure WebpackHotMiddleware
        devServer.use(WebpackHotMiddleware(compiler));

        // serve files from the public dir
        devServer.use(express.static(paths.appPublic, {
            index: false,
        }));

        // server side rendering
        if (isSSREnabled) {
            devServer.use(webpackUniversalAppMiddleware(compiler, {
                index: 'index.html',
            }));
        }

        // launch webpack dev server
        devServer.listen(port, HOST, err => {
            if (err) {
                return console.log(err);
            }
            if (isInteractive) {
                clearConsole();
            }
            console.log(chalk.cyan('Starting the development server...\n'));
        });

        ['SIGINT', 'SIGTERM'].forEach(function (sig) {
            process.on(sig, function () {
                // devServer.close();
                process.exit();
            });
        });
    })
    .catch(err => {
        if (err && err.message) {
            console.log(err.message);
        }
        process.exit(1);
    });
