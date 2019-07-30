import React from 'react';
import classNames from 'classnames/bind';
import styles from './ExtendedUIComponent.module.scss';

const cx = classNames.bind(styles);
const ExtendedUIComponent = () => (
    <div
        className={cx(
            'vub-c-original-ui-component',
            'vub-c-original-ui-component--modifier-1',
        )}
    >
        <div className={cx('vub-c-original-ui-component__element-1')} />
        <div className={cx('vub-c-extended-ui-component__element-2')} />
        <div className={cx('vub-c-original-ui-component__element-3')} />
        <div className={cx('vub-c-original-ui-component__element-4')} />
    </div>
);

export default ExtendedUIComponent;
