'use strict';

const createIndexRenderer = require('./lib/createIndexRenderer');
const requireServerExports = require('./lib/requireServerExports');

/**
 * Webpack universal app middleware
 */
module.exports = function webpackUniversalAppMiddleware(compiler, options = {}) {
    options = {
        index: undefined,
        inject: false,
        server: 'server',
        client: 'client',
        ...options,
    };

    const isMultiple = !!compiler.compilers;

    let serverCompiler = compiler;
    let clientCompiler = compiler;
    if (isMultiple) {
        serverCompiler = compiler.compilers.find(compiler => compiler.name === options.server);
        clientCompiler = compiler.compilers.find(compiler => compiler.name === options.client);
    }

    return async function middleware(req, res, next) {
        const webpackStats = res.locals.webpackStats.toJson();

        let serverStats = webpackStats;
        let clientStats = webpackStats;
        if (isMultiple) {
            serverStats = webpackStats.children.find(compilation => compilation.name === options.server);
            clientStats = webpackStats.children.find(compilation => compilation.name === options.client);
        }

        // load index.html template file
        const indexRenderer = await createIndexRenderer(clientCompiler, clientStats, options.index);

        // require server exports
        const {render} = await requireServerExports(serverCompiler, serverStats);
        const context = {};

        render(req, res, context)
            .then(({htmlContent, preloadedState}) => {
                if (context.url) {
                    res.writeHead(301, {
                        Location: context.url
                    });
                    res.end();
                } else {
                    res.write(indexRenderer.renderString(htmlContent, preloadedState));
                    res.end();
                }
            });
    };
};
