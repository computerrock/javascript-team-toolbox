import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import 'svgxuse'; // fixes IE10/11 issue when using external SVG
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// render app
ReactDOM.render(
    (
        <AppContainer>
            <App />
        </AppContainer>
    ),
    document.getElementById('root'),
);

// webpack hot module replacement for App component
if (module.hot) {
    module.hot.accept('./App', () => {
        ReactDOM.render(
            (
                <AppContainer>
                    <App />
                </AppContainer>
            ),
            document.getElementById('root'),
        );
    });
}

registerServiceWorker();
