import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import 'svgxuse'; // fixes IE10/11 issue when using external SVG
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// render app
ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
