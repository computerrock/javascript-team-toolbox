import React from 'react';
import {hot} from 'react-hot-loader';
import classNames from 'classnames/bind';
import logo from './logo.svg';
import styles from './App.module.scss';
import SVGSpriteSymbol from './SVGSpriteSymbol';

const cx = classNames.bind(styles);
const App = () => (
    <div className={cx('cn-c-app')}>
        <header className={cx('cn-c-app__header')}>
            <SVGSpriteSymbol className={cx('cn-c-app__logo')} spriteSymbol={logo} />
            <h1 className={cx('cn-c-app__title')}>Welcome to React</h1>
        </header>
        <p className={cx('cn-c-app__intro')}>
            To get started, edit <code>src/App.js</code> and save to reload.
        </p>
    </div>
);

export default hot(module)(App);
