import '@computerrock/react-app-polyfill/ie11';
import '@computerrock/react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// render app
ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
