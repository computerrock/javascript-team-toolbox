import {takeEvery, select, all, call} from 'redux-saga/effects';
import {matchRoutes} from 'react-router-config';

/**
 * Side effects running END signal
 *
 * @type {string}
 */
export const END_SIDE_EFFECTS_RUNNING = 'END_SIDE_EFFECTS_RUNNING';

/**
 * Returns sagas defined in static routes config for given pathname
 *
 * @param {string} location - router location object
 * @param {Array<Object>} routeBranch
 * @returns {Array<Array<[saga, arguments]>>}
 */
const getBranchSagas = (routeBranch, location) => {
    const branchSagas = [];
    routeBranch
        .filter(branchItem => typeof branchItem.route.locationChangeSideEffects !== 'undefined'
            && Array.isArray(branchItem.route.locationChangeSideEffects))
        .forEach(branchItem => {
            const {route, match} = branchItem;
            const branchItemSideEffect = [];
            route.locationChangeSideEffects.forEach(sideEffect => {
                branchItemSideEffect.push([
                    sideEffect[0],
                    {
                        type: '@@router/LOCATION_CHANGE_SIDE_EFFECT',
                        payload: {
                            ...sideEffect[1],
                            match,
                            location,
                        },
                    },
                ]);
            });

            branchSagas.push(branchItemSideEffect);
        });

    return branchSagas.reverse();
};

/**
 * Runs branch sagas by running deepest route sagas in each recursion step
 *
 * @param branchSagas
 * @return {IterableIterator<*>}
 */
const runBranchSagas = function* runBranchSagas(branchSagas) {
    const subBranchSagas = [...branchSagas];
    const branchRouteSagas = subBranchSagas.pop().reverse();

    let shouldContinueRunning;
    while (branchRouteSagas.length > 0) {
        const [saga, ...args] = branchRouteSagas.pop();
        shouldContinueRunning = yield call(saga, ...args);
        if (shouldContinueRunning === END_SIDE_EFFECTS_RUNNING) break;
    }

    if (subBranchSagas.length > 0 && shouldContinueRunning !== END_SIDE_EFFECTS_RUNNING) {
        yield* runBranchSagas(subBranchSagas);
    }
};

/**
 * Prepares application state for matched route by running configured side-effects of a route
 *
 * @param {Array} routes - static route configuration
 */
const prepareRouteState = function* prepareRouteState(routes) {
    const routerState = yield select(state => state.router);
    const matchedRouteBranch = matchRoutes(routes, routerState.location.pathname);
    const branchSagas = getBranchSagas(matchedRouteBranch, routerState.location);

    yield* runBranchSagas(branchSagas);
};

/**
 * Initializes application state for matched starting route by running configured side-effects
 * then runs connectedRoute watcher for future route changes
 *
 * @param {Array} routes - static route configuration
 */
export const connectedRouterSaga = function* connectedRouterSaga(routes) {
    yield all([
        takeEvery('@@router/LOCATION_CHANGE', prepareRouteState, routes),
    ]);
};
