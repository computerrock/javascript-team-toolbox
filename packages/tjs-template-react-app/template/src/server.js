import React from 'react';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import createMemoryHistory from 'history/createMemoryHistory';
import {StaticRouter} from 'react-router';
import {renderRoutes} from 'react-router-config';
import routes from './routes';
import configureStore from './store';
import rootSaga from './saga';
import './styles/index.scss';

export const render = async function render(req, res, context) {
    // initialize history
    const history = createMemoryHistory({
        initialEntries: [req.url],
    });

    // initialize store
    const store = configureStore({}, history);
    const sagaTask = store.runSaga(rootSaga);

    // application
    const application = (
        <Provider store={store}>
            <StaticRouter
                location={req.url}
                context={context}
            >
                {renderRoutes(routes)}
            </StaticRouter>
        </Provider>
    );

    // run saga through initial render
    renderToString(application);
    store.close();

    // on sagaTask done, render application
    return sagaTask.done.then(() => ({
        htmlContent: renderToString(application),
        preloadedState: store.getState(),
    }));
};
