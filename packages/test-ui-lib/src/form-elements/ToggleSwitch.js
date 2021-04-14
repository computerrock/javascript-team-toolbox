import React from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import {withStyles, withStylesPropTypes, withStylesDefaultProps} from '../withStyles';
import styles from './ToggleSwitch.module.scss';
import Checkbox from './Checkbox';

const ToggleSwitch = React.forwardRef((props, ref) => {
    const {children, cx, createClassNameResolver, className, name, ...restProps} = props;
    const {isSelected, isDisabled} = props;
    const classNameResolver = createClassNameResolver('ace-c-toggle-switch');

    return (
        <Checkbox
            {...restProps}
            ref={ref}
            name={`${name}Checkbox`}
            isComposedIn={true}
            classNameResolver={classNameResolver}
            className={cx('ace-c-checkbox--no-chrome', className, {
                'ace-c-checkbox--is-selected': isSelected,
                'ace-c-checkbox--is-disabled': isDisabled,
            })}
        >
            <span className={cx('ace-c-toggle-switch__track')}>
                <span className={cx('ace-c-toggle-switch__toggle')} />
            </span>
            {children}
        </Checkbox>
    );
});

ToggleSwitch.displayName = 'ToggleSwitch';

ToggleSwitch.propTypes = {
    ...withStylesPropTypes,
    ...withFormContextPropTypes,
};

ToggleSwitch.defaultProps = {
    ...withStylesDefaultProps,
    ...withFormContextDefaultProps,
};

export default withFormContext({isSelectable: true})(withStyles(styles)(ToggleSwitch));
