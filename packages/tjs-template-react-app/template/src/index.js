import '@computerrock/react-app-polyfill/ie11';
import '@computerrock/react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {FormationApp, configureStore, serviceWorker} from '@computerrock/formation-core';
import {createBrowserHistory, renderRoutes} from '@computerrock/formation-router';
import config from './config';
import routes from './routes';
import routePaths from './routePaths';
import modals from './modals';
import reducers from './reducers';
import sagas from './sagas';
import serviceManager from './serviceManager';

// initialize history
const history = createBrowserHistory({basename: config.PUBLIC_URL});

// initialize store
const store = configureStore({
    routes,
    history,
    reducers,
    serviceManager,
});
store.runSagas(sagas);

// load i18nService
const i18nService = serviceManager.loadService('i18nService');

// Application
const Application = ({store, history}) => {
    return (
        <FormationApp
            store={store}
            history={history}
            modals={modals}
            routes={routes}
            routePaths={routePaths}
            defaultRoutePath={routePaths.DASHBOARD}
            i18nService={i18nService}
            render={({children}) => (
                <Fragment>
                    {children}
                </Fragment>
            )}
        >
            {renderRoutes(routes)}
        </FormationApp>
    );
};

Application.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

// render application
ReactDOM.render(<Application store={store} history={history} />, document.getElementById('root'));

// webpack hot module replacement for ./routes configuration,
// ./saga configuration and state is not hot reloaded but needs to
// be accepted so HMR can work properly
if (module.hot) {
    module.hot.accept(['./routes', './sagas'], () => {
        ReactDOM.render(<Application store={store} history={history} />, document.getElementById('root'));
    });
}

// webpack hot module replacement for reducers
if (module.hot) {
    module.hot.accept('./reducers', () => {
        const nextReducers = require('./reducers').default;
        store.hotReloadReducers(nextReducers);
    });
}

// register service worker
serviceWorker.register({
    // reload on new content
    onUpdate: registration => {
        const waitingServiceWorker = registration.waiting;

        if (waitingServiceWorker) {
            waitingServiceWorker.addEventListener('statechange', event => {
                if (event.target.state === 'activated') {
                    window.location.reload();
                }
            });
            waitingServiceWorker.postMessage({type: 'SKIP_WAITING'});
        }
    },
});
