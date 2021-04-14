import React from 'react';

export default React.createContext({
    isOpen: false,
    dropDownTriggerRef: null,
    toggleDropDown: () => {},
    openDropDown: () => {},
    closeDropDown: () => {},
});
