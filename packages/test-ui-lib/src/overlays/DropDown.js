import React, {useRef, useState, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {withStyles, withStylesPropTypes, withStylesDefaultProps} from '../withStyles';
import styles from './DropDown.module.scss';
import Overlay from './Overlay';
import DropDownContext from './DropDownContext';
import getDropDownPosition from './getDropDownPosition';
import * as positions from './positions';
import useFocusSwitch from '../utils/useFocusSwitch';

const DropDown = ({children, cx, direction, alignment}) => {
    const dropDownRef = useRef(null);
    const [dropDownPosition, setDropDownPosition] = useState(positions.DEFAULT_POSITION);
    const {isOpen, dropDownTriggerRef, closeDropDown} = useContext(DropDownContext);
    useFocusSwitch({
        ref: [dropDownRef, dropDownTriggerRef],
        onFocusSwitch: () => closeDropDown(),
    });

    useEffect(() => {
        if (!dropDownRef.current || !dropDownTriggerRef.current) return;

        setDropDownPosition(getDropDownPosition({
            dropDownTriggerElem: dropDownTriggerRef.current,
            dropDownElem: dropDownRef.current,
            direction,
            alignment,
        }));
    }, [isOpen, dropDownTriggerRef, direction, alignment]);

    return isOpen ? (
        <Overlay id="drop-down" position={dropDownPosition}>
            <div className={cx('adc-c-drop-down')} ref={dropDownRef}>
                <div className={cx('adc-c-drop-down__content')}>
                    {children}
                </div>
            </div>
        </Overlay>
    ) : null;
};

DropDown.propTypes = {
    ...withStylesPropTypes,
    direction: PropTypes.oneOf([positions.DIRECTION_TOP, positions.DIRECTION_BOTTOM]),
    alignment: PropTypes.oneOf([positions.ALIGNMENT_START, positions.ALIGNMENT_END]),
};

DropDown.defaultProps = {
    ...withStylesDefaultProps,
    direction: positions.DIRECTION_BOTTOM,
    alignment: positions.ALIGNMENT_START,
};

export default withStyles(styles)(DropDown);
