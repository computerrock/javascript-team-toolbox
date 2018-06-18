import React from 'react';
import logo from './logo.svg';
import './App.scss';
import SVGSpriteSymbol from './SVGSpriteSymbol';

const App = () => (
    <div className="cn-c-app">
        <header className="cn-c-app__header">
            <SVGSpriteSymbol className="cn-c-app__logo" spriteSymbol={logo} />
            <h1 className="cn-c-app__title">Welcome to React</h1>
        </header>
        <p className="cn-c-app__intro">
            To get started, edit <code>src/App.js</code> and save to reload.
        </p>
    </div>
);

export default App;
