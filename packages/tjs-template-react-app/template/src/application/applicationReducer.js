/**
 * Initial application domain state
 *
 * @type {Object}
 */
const initialState = {
    serviceManager: null,
};

/**
 * Application reducer
 *
 * @param state
 * @param {FluxStandardAction} action
 * @returns {Object}
 */
const applicationReducer = (state = initialState, action) => {
    state = {
        ...initialState,
        ...state,
    };

    switch (action.type) {
        default:
        // no-op
    }
    return state;
};

export default applicationReducer;
