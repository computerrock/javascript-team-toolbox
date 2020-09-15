import '@computerrock/react-app-polyfill/ie11';
import '@computerrock/react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

// render app
ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept('./App', () => {
        ReactDOM.render(<App />, document.getElementById('root'));
    });
}

// register service worker
serviceWorker.register({
    onUpdate: () => {
        // reload on new content
        window.location.reload();
    },
});
