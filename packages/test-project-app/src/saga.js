import {all, call} from 'redux-saga/effects';
import routes from './routes';
import {connectedRouterSaga} from './application/connectedRouterSagas';

/**
 * Root redux saga
 */
const rootSaga = function* rootSaga() {
    yield all([
        // no-op

        // connected router saga should be last in sequence!
        call(connectedRouterSaga, routes),
    ]);
};

export default rootSaga;
