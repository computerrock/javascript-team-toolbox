import '@computerrock/react-app-polyfill/ie11';
import '@computerrock/react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {renderRoutes} from 'react-router-config';
import {createBrowserHistory} from 'history';
import config from './config';
import routes from './routes';
import configureStore from './store';
import rootSaga from './saga';
import * as serviceWorker from './application/serviceWorker';

// initialize history
const history = createBrowserHistory({basename: config.PUBLIC_URL});

// initialize store
const store = configureStore({}, history); // eslint-disable-line
store.runSaga(rootSaga);

// Application
const Application = ({store, history}) => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                {renderRoutes(routes)}
            </ConnectedRouter>
        </Provider>
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
    module.hot.accept(['./routes', './saga'], () => {
        ReactDOM.render(<Application store={store} history={history} />, document.getElementById('root'));
    });
}

// register service worker
serviceWorker.register({
    onUpdate: () => {
        // reload on new content
        window.location.reload();
    },
});
