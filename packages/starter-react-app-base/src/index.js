import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'svgxuse'; // fixes IE10/11 issue when using external SVG
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// render app
ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
