import React from 'react';

export default React.createContext({
    formName: null,
    formFieldRegistry: {},
    formFieldStates: {},
    registerFormField: () => null,
    unregisterFormField: () => null,
    setFormFieldState: () => null,
    submitForm: () => null,
});
