import React from 'react';
import {renderToString} from 'react-dom/server';
import {FormationAppServer, configureStore} from '@computerrock/formation-core';
import {createMemoryHistory, renderRoutes} from '@computerrock/formation-router';
import routes from './routes';
import reducers from './reducers';
import sagas from './sagas';
import serviceManager from './serviceManager';
import './styles/index.scss';

export const render = async function render(req, res, context) {
    // initialize history
    const history = createMemoryHistory({
        initialEntries: [req.url],
    });

    // initialize store
    const store = configureStore({
        routes,
        history,
        reducers,
        serviceManager,
    });
    const sagaTask = store.runSagas(sagas);

    // application
    const application = (
        <FormationAppServer
            store={store}
            routes={routes}
            reqUrl={req.url}
            context={context}
        >
            {renderRoutes(routes)}
        </FormationAppServer>
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
