'use strict';

const path = require('path');
const cssesc = require('cssesc');
const loaderUtils = require('loader-utils');
const normalizePath = require('normalize-path');
const changeCase = require('change-case');

function getLocalBEMIdent(loaderContext, localIdentName, localName, options) {
    if (!options.context) {
        // eslint-disable-next-line no-param-reassign
        options.context = loaderContext.rootContext;
    }

    const request = normalizePath(
        path.relative(options.context || '', loaderContext.resourcePath)
    );
    // eslint-disable-next-line no-param-reassign
    options.content = `${options.hashPrefix + request}+${unescape(localName)}`;

    let basename = 'file';
    if (loaderContext.resourcePath) {
        const parsed = path.parse(loaderContext.resourcePath);
        if (parsed.name) basename = parsed.name;
    }

    // make sure localIdentName uses [bem]
    localIdentName = localIdentName.includes('[bem]') ? localIdentName : '[bem]---[contenthash:8]';

    // create bemName
    let bemName = basename.indexOf('.') === -1
        ? basename : basename.substr(0, basename.indexOf('.'));
    const elementModifierIndex = localName.indexOf('__') !== -1
        ? localName.indexOf('__')
        : (localName.indexOf('--') !== -1 ? localName.indexOf('--') : -1);
    bemName = changeCase.paramCase(bemName) + (elementModifierIndex !== -1
        ? localName.substr(elementModifierIndex, localName.length) : '');

    // match regExp against localName and apply to localIdentName before regular interpolation
    if (options.regExp && localName) {
        const match = localName.match(new RegExp(options.regExp));
        if (match) {
            match.forEach((matched, i) => {
                localIdentName = localIdentName.replace(new RegExp('\\[' + i + '\\]', 'ig'), matched);
            });
        }
        options.regExp = null;
    }

    // Using `[path]` placeholder outputs `/` we need escape their
    // Also directories can contains invalid characters for css we need escape their too
    return cssesc(
        loaderUtils
            .interpolateName(loaderContext, localIdentName, options)
            // For `[hash]` placeholder
            .replace(/^((-?[0-9])|--)/, '_$1'),
        {isIdentifier: true}
    )
        .replace(/\\\[local\\\]/gi, localName)
        .replace(/\\\[bem\\\]/gi, bemName);
}

module.exports = getLocalBEMIdent;
