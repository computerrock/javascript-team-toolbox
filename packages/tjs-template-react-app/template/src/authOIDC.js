import {resolveRoute} from '@computerrock/formation-router';
import {FormationAuthPlugin} from '@computerrock/formation-auth';
import routePaths from './routePaths';

const {origin} = window.location;
const authorizeRoute = resolveRoute(routePaths.OIDC_AUTHORIZE);
const authenticateRoute = resolveRoute(routePaths.OIDC_AUTHENTICATE);
const {href: authorizeRedirectURI} = new URL(authorizeRoute.pathname, origin);
const {href: authenticateRedirectURI} = new URL(authenticateRoute.pathname, origin);

/**
 * TODO Instantiate FormationAuthPlugin for OIDC auth layer
 *
 * TODO move instantiation to plugin manager (@computerrock/formation-core);
 *  and then remove file
 *
 * @type {FormationAuthPlugin}
 */
const authOIDC = new FormationAuthPlugin({
    name: 'oidc',
    authServiceName: 'authOIDCService',
    rootApplicationRoute: routePaths.ROOT,
    authorizeRedirectURI,
    authenticateRedirectURI,
});

export default authOIDC;
