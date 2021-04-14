import React from 'react';

export default React.createContext({
    selectableGroupName: null,
    optionFieldRegistry: {},
    optionFieldStates: {},
    registerOptionField: () => null,
    unregisterOptionField: () => null,
    setOptionFieldValue: () => null,
    isGroupMultipleChoice: undefined,
    isGroupDisabled: undefined,
});
