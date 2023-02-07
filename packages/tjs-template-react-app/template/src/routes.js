import routePaths from './routePaths';
import authOIDC from './authOIDC';
import authOAuth2 from './authOAuth2';
import ApplicationScreen from './application/ApplicationScreen';
import NotFoundScreen from './application/NotFoundScreen';
import AuthRedirectionScreen from './application/AuthRedirectionScreen';
import DashboardScreen from './dashboard/DashboardScreen';

/**
 * Location object definition (react-router, history)
 *
 * @typedef {Object} Location
 * @property {string} key - key is available for all by HashHistory
 * @property {string} pathname - path part of route
 * @property {string} search - search query part of route
 * @property {string} hash - hash (#) part of route
 * @property {Object} state - user defined state for the route
 */

/**
 * ConnectedRoute object definition (react-router-config, connected-react-router, redux-saga)
 *
 * @typedef {Object} ConnectedRoute
 * @property {string} path - any valid URL path that path-to-regexp understands.
 * @property {?Object} component - React component for application screen
 * @property {?function} render - render prop function
 * @property {?Location} location - for matching against different location than one in history
 * @property {?boolean} exact - when true, will only match if the path matches the location.pathname exactly
 * @property {?boolean} string - when true, a path that has a trailing slash will only match a location.pathname
 *                      with a trailing slash
 * @property {?boolean} sensitive - when true, will match if the path is case sensitive.
 * @property {?Array<ConnectedRoute>} routes - sub-routes
 * @property {?Array<Array<[saga, Object]>>} locationChangeSideEffects - Redux sagas (side-effects) to be run
 *                                            with payload object
 */

/**
 * Static route configuration
 *
 * @type {Array<ConnectedRoute>}
 */
export default [{
    component: ApplicationScreen,
    locationChangeSideEffects: [],
    routes: [
        {
            path: routePaths.OIDC_AUTHORIZE,
            exact: true,
            component: AuthRedirectionScreen,
            locationChangeSideEffects: [
                [authOIDC.authorize],
            ],
        },
        {
            path: routePaths.OIDC_AUTHENTICATE,
            exact: true,
            component: AuthRedirectionScreen,
            locationChangeSideEffects: [
                [authOIDC.authenticate],
            ],
        },
        {
            path: routePaths.OAUTH2_AUTHORIZE,
            exact: true,
            component: AuthRedirectionScreen,
            locationChangeSideEffects: [
                [authOAuth2.authorize],
            ],
        },
        {
            path: routePaths.OAUTH2_AUTHENTICATE,
            exact: true,
            component: AuthRedirectionScreen,
            locationChangeSideEffects: [
                [authOAuth2.authenticate],
            ],
        },
        {
            path: routePaths.DASHBOARD,
            exact: true,
            component: DashboardScreen,
            locationChangeSideEffects: [
                // [authOIDC.loadAuthSession],
                // [authOAuth2.loadAuthSession],
            ],
        },
        {
            path: '*',
            component: NotFoundScreen,
        },
    ],
}];
