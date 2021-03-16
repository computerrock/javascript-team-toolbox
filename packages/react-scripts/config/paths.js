'use strict';

const path = require('path');
const fs = require('fs');
const {URL} = require('url');

const appDirectory = fs.realpathSync(process.cwd());
const appConfig = require(path.resolve(appDirectory, 'app.config.js'));
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const getPublicPath = envPublicPath => {
    if (!envPublicPath) return '/';

    // ensure last slash exists
    envPublicPath = envPublicPath.endsWith('/') ? envPublicPath : envPublicPath + '/';
    const isEnvDevelopment = process.env.NODE_ENV === 'development';

    // validate if `envPublicUrl` is a URL or path like
    // `stubDomain` is ignored if `envPublicPath` contains a domain
    const stubDomain = 'https://create-react-app.dev';
    const validPublicPath = new URL(envPublicPath, stubDomain);

    // For apps that do not use client-side routing with pushState public path
    // can be set to "." to enable relative asset paths in production.
    return envPublicPath.startsWith('.')
        ? (isEnvDevelopment ? '/' : envPublicPath) : validPublicPath.pathname
};

const getSourcePaths = () => {
    const sourcePaths = [
        resolveApp('src'),
    ];
    (appConfig.moduleSourcePaths || []).forEach(moduleSourcePath => {
        sourcePaths.push(fs.realpathSync(process.cwd() + '/node_modules/' + moduleSourcePath));
    });

    return sourcePaths;
};

// @remove-on-eject-begin
const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath);
// @remove-on-eject-end

module.exports = {
    dotenv: resolveApp('.env'),
    publicPath: getPublicPath(process.env.PUBLIC_URL),
    appPath: resolveApp('.'),
    appBuild: resolveApp('build'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveApp('src/index.js'),
    appServerJs: resolveApp('src/server.js'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appSources: getSourcePaths(),
    appNodeModules: resolveApp('node_modules'),
    reactRefreshEntries: [
        require.resolve('@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils'),
        require.resolve('@pmmmwh/react-refresh-webpack-plugin/overlay'),
        require.resolve('react-refresh/runtime'),
    ],
    // @remove-on-eject-begin
    ownPath: resolveOwn('.'),
    ownNodeModules: resolveOwn('node_modules'),
    // @remove-on-eject-end
};
