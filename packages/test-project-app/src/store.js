import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware, {END} from 'redux-saga';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import {routerMiddleware} from 'connected-react-router';
import createRootReducer from './reducer';

/**
 * Creates Redux store from seed state and root reducer.
 * Then configures it by applying middleware and attaching helper methods
 *
 * @param {Object} initialState
 * @param {Object} history
 * @returns {Object}
 */
export default function configureStore(initialState, history) {
    const sagaMiddleware = createSagaMiddleware();
    let middleware = [
        routerMiddleware(history),
        sagaMiddleware,
    ];

    // if in development and in browser log redux actions
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
        middleware = [...middleware, createLogger()];
    }

    // if in development and in browser log redux actions
    if (process.env.DEBUG_STORE_SURVEY_DATA_ACTION
        && process.env.NODE_ENV !== 'development'
        && typeof window !== 'undefined') {
        middleware = [...middleware, createLogger({
            predicate: (getState, action) => action.type === process.env.DEBUG_STORE_SURVEY_DATA_ACTION,
        })];
    }

    const store = createStore(
        createRootReducer(history),
        initialState,
        composeWithDevTools(
            applyMiddleware(...middleware),
        ),
    );

    // webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept('./reducer', () => {
            const nextCreateRootReducer = require('./reducer').default;
            store.replaceReducer(nextCreateRootReducer(history));
        });
    }

    // store helper methods
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    return store;
}
