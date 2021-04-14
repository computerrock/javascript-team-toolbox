import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import DropDownContext from './DropDownContext';

/**
 * Provides context for DropDown usage instance
 */
const DropDownProvider = ({children, baseComponentRef}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropDownTriggerRef = useRef();

    const toggleDropDown = () => {
        setIsOpen(prevState => !prevState);
    };

    const openDropDown = () => setIsOpen(true);

    const closeDropDown = () => setIsOpen(false);

    return (
        <DropDownContext.Provider
            value={{
                isOpen,
                dropDownTriggerRef: baseComponentRef || dropDownTriggerRef,
                toggleDropDown,
                openDropDown,
                closeDropDown,
            }}
        >
            {children}
        </DropDownContext.Provider>
    );
};

DropDownProvider.propTypes = {
    baseComponentRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({current: PropTypes.elementType}),
    ]),
};

DropDownProvider.defaultProps = {
    baseComponentRef: null,
};

export default DropDownProvider;
