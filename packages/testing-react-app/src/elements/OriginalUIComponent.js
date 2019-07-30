import React from 'react';
import classNames from 'classnames/bind';
import styles from './OriginalUIComponent.module.scss';
import test1Styles from './Test1.module.scss';

const cx = classNames.bind({...styles, ...test1Styles});
const OriginalUIComponent = () => (
    <div className={cx('vub-c-original-ui-component', 'vub-c-test1')}>
        <div className={cx('vub-c-original-ui-component__element-1')} />
        <div className={cx('vub-c-original-ui-component__element-2')} />
    </div>
);

export default OriginalUIComponent;
