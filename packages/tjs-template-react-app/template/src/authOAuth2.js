import {resolveRoute} from '@computerrock/formation-router';
import {FormationAuthPlugin} from '@computerrock/formation-auth';
import routePaths from './routePaths';

const {origin} = window.location;
const authorizeRoute = resolveRoute(routePaths.OAUTH2_AUTHORIZE);
const authenticateRoute = resolveRoute(routePaths.OAUTH2_AUTHENTICATE);
const {href: authorizeRedirectURI} = new URL(authorizeRoute.pathname, origin);
const {href: authenticateRedirectURI} = new URL(authenticateRoute.pathname, origin);

/**
 * Instantiate FormationAuthPlugin for OAuth2 auth layer
 *
 * TODO move instantiation to plugin manager (@computerrock/formation-core);
 *  and then remove file
 *
 * @type {FormationAuthPlugin}
 */
const authOAuth2 = new FormationAuthPlugin({
    name: 'oauth2',
    authServiceName: 'authOAuth2Service',
    rootApplicationRoute: routePaths.ROOT,
    authorizeRedirectURI,
    authenticateRedirectURI,
});

export default authOAuth2;
