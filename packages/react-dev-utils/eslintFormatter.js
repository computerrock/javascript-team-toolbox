/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const chalk = require('chalk');
const stripAnsi = require('strip-ansi');
const table = require('text-table');
const cwd = process.cwd();

function isError(message) {
    return message.fatal || message.severity === 2;
}

function getRelativePath(filePath) {
    return path.relative(cwd, filePath);
}

function formatter(results) {
    let output = '\n';
    let hasErrors = false;
    let reportContainsErrorRuleIDs = false;

    results.forEach(result => {
        let messages = result.messages;
        if (messages.length === 0) {
            return;
        }

        messages = messages.map(message => {
            let messageType;
            if (isError(message)) {
                messageType = 'error';
                hasErrors = true;
                if (message.ruleId) {
                    reportContainsErrorRuleIDs = true;
                }
            } else {
                messageType = 'warn';
            }

            let line = message.line || 0;
            let position = chalk.bold('Line ' + line + ':');
            return [
                '',
                position,
                messageType,
                message.message.replace(/\.$/, ''),
                chalk.underline(message.ruleId || ''),
            ];
        });

        // if there are error messages, we want to show only errors
        if (hasErrors) {
            messages = messages.filter(m => m[2] === 'error');
        }

        // add color to rule keywords
        messages.forEach(m => {
            m[4] = m[2] === 'error' ? chalk.red(m[4]) : chalk.yellow(m[4]);
            m.splice(2, 1);
        });

        let outputTable = table(messages, {
            align: ['l', 'l', 'l'],
            stringLength(str) {
                return stripAnsi(str).length;
            },
        });

        // print filename, relative path and errors
        output += chalk.underline(`${getRelativePath(result.filePath)}\n`);
        output += `${outputTable}\n\n`;
    });

    if (reportContainsErrorRuleIDs) {
        // Unlike with warnings, we have to do it here.
        // We have similar code in react-scripts for warnings,
        // but warnings can appear in multiple files so we only
        // print it once at the end. For errors, however, we print
        // it here because we always show at most one error, and
        // we can only be sure it's an ESLint error before exiting
        // this function.
        output +=
            'Search for the ' +
            chalk.underline(chalk.red('keywords')) +
            ' to learn more about each error.';
    }

    return output;
}

module.exports = formatter;
