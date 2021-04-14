import React, {useRef, useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import FormContext from './FormContext';

/**
 * Form context provider
 *
 * - provides form context to nested form fields
 * - registers form fields allowing for dynamic forms
 * - handles form submitting
 */
const Form = ({children, name: formName, onChange, onSubmit}) => {
    const formFieldRegistryRef = useRef({});
    const [formFieldStates, updateFormFieldStates] = useState({});
    const isTouchedRef = useRef(false);

    /**
     * Registers form field
     *
     * @param {string} fieldName
     * @param {Object} fieldProperties
     */
    const registerFormField = useCallback((fieldName, fieldProperties) => {
        if (!formName || typeof formFieldRegistryRef.current[fieldName] !== 'undefined') return;
        formFieldRegistryRef.current[fieldName] = fieldProperties;
    }, [formName]);

    /**
     * Unregisters form field
     *
     * @param {string} fieldName
     */
    const unregisterFormField = useCallback(fieldName => {
        delete formFieldRegistryRef.current[fieldName];

        updateFormFieldStates(formFieldStates => {
            const {[fieldName]: remove, ...restFieldValues} = formFieldStates;
            return restFieldValues;
        });
    }, []);

    /**
     * Sets form field state
     *
     * @param {string} fieldName
     * @param {Object} stateObject
     */
    const setFormFieldState = useCallback((fieldName, stateObject) => {
        const {isTouched, ...newState} = stateObject;
        if (typeof isTouched === 'boolean' && isTouched !== isTouchedRef.current) {
            isTouchedRef.current = isTouched;
        }

        updateFormFieldStates(formFieldStates => ({
            ...formFieldStates,
            [fieldName]: {
                ...formFieldStates[fieldName],
                ...newState,
            },
        }));
    }, []);

    /**
     * TODO: Form onChange handler
     */
    useEffect(() => {
        if (typeof onChange === 'function' && isTouchedRef.current) {
            onChange(formFieldStates);
        }
    }, [formFieldStates, onChange]);

    /**
     * Sets form field errors
     *
     * @param {string} fieldName
     * @param {boolean} isValid
     * @param {string|Array<string>} errors
     */
    // const setFieldErrors = ({fieldName, isValid, errors}) => {
    //     errors = typeof errors === 'string' ? [errors] : errors;
    //     isValid = typeof isValid === 'undefined' && errors.length ? false : isValid;
    //
    //     setFormFieldState({fieldName, isValid, errors});
    // };

    /**
     * Runs field validation
     */
    // const runFieldValidation = fieldName => {
    //     const formField = fields[fieldName];
    //
    //     // skip if validate is not a function
    //     if (typeof formField.validate !== 'function') return true;
    //
    //     // reset previous validation states
    //     if (!formField.isValid) setFieldErrors({fieldName: formField.name, isValid: true, errors: []});
    //
    //     return !!formField.validate(fields, setFieldErrors);
    // };

    /**
     * Validates form by running all registered validations (fields)
     */
    // const validateForm = () => {
    //     let isFormValid = true;
    //     Object.keys(fields).forEach(fieldName => {
    //         const formField = fields[fieldName];
    //
    //         // skip if field has no validation
    //         if (!formField.isValidationGroup) return;
    //
    //         const isFieldValid = runFieldValidation(fieldName);
    //         isFormValid = isFormValid && isFieldValid;
    //     }, {});
    //
    //     return isFormValid;
    // };

    // scroll to first non valid field
    // useEffect(() => {
    //     const nonValidFieldName = Object.keys(fields).find(fieldName => {
    //         return !fields[fieldName].isValid;
    //     });
    //
    //     const nonValidField = fields[nonValidFieldName];
    //     const nonValidFieldElement = nonValidField && nonValidField.fieldRef
    //         ? nonValidField.fieldRef : null;
    //     if (nonValidFieldElement && nonValidFieldElement.current) {
    //         const rootElement = document.querySelector('#root');
    //         rootElement.scrollTop = nonValidFieldElement.current.offsetTop;
    //     }
    // });

    /**
     * Maps fields into [fieldName:value] pairs
     *
     * @param {Object} fields
     * @return {Object}
     */
    // const getFieldValues = fields => {
    //     return Object.keys(fields).reduce((values, fieldName) => {
    //         const formField = fields[fieldName];
    //
    //         // skip if field is part of selectable group
    //         if (formField.isSelectable && formField.selectableGroupName) return values;
    //
    //         // skip if field is validation group or submit button
    //         if (formField.isValidationGroup || formField.isSubmitButton) return values;
    //
    //         // if field is selectable and not selected returned value will be undefined
    //         values[formField.name] = !formField.isSelectable
    //             ? formField.value : (formField.isSelected ? formField.value : undefined);
    //         return values;
    //     }, {});
    // };

    /**
     * Handles form submit event
     *
     * @param event
     */
    const submitForm = event => {
        event.preventDefault();

        // TODO run validations, persist found error states instead of submitting
        // if (!validateForm()) {
        //     persistFields();
        //     setIsFirstSubmit(false);
        //     return;
        // }

        // TODO
        if (typeof onSubmit === 'function') {
            onSubmit('form result' /* getFieldValues() */);
        }
    };

    // don't provide form context if formName is missing
    // fields are not connected to FormContext and will behave like controlled form inputs
    if (!formName || typeof formName !== 'string') {
        return typeof children === 'function' ? children() : children;
    }

    return (
        <form name={formName} onSubmit={submitForm}>
            <FormContext.Provider
                value={{
                    formName,
                    formFieldRegistry: formFieldRegistryRef.current,
                    formFieldStates,
                    registerFormField,
                    unregisterFormField,
                    setFormFieldState,
                    submitForm,
                }}
            >
                {typeof children === 'function'
                    ? children({} /* TODO getFieldValues() */) : children}
            </FormContext.Provider>
        </form>
    );
};

Form.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
};

Form.defaultProps = {
    onChange: () => {},
    onSubmit: () => {},
};

export default Form;
