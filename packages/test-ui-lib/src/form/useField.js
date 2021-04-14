import {useRef, useContext, useCallback, useEffect, useState, useMemo} from 'react';
import FormContext from './FormContext';
import SelectableContext from './SelectableContext';
// import ValidationContext from './ValidationContext'; TODO

const callbackPropKeys = ['onChange'];
const statePropKeys = ['value', 'isSelected', 'isDisabled', 'isMultipleChoice'];
const registryPropKeys = ['name', 'defaultValue', 'defaultIsSelected', 'isComposedIn'];

const useField = (props, fieldOptions) => {
    const fieldRegistryRef = useRef({hasRegistry: false});
    const [fieldState, updateFieldState] = useState({}); // state for uncontrolled field
    const formContext = useContext(FormContext);
    const selectableContext = useContext(SelectableContext);
    const {formFieldRegistry, formFieldStates} = formContext;
    const {optionFieldRegistry, optionFieldStates} = selectableContext;
    const {name: fieldName} = props;

    /**
     * Parse base component props
     *
     * these are non-field props that should be
     * passed back to base component
     */
    const baseComponentProps = useMemo(() => {
        return Object.keys(props).reduce((baseComponentProps, propKey) => {
            if (!registryPropKeys.includes(propKey)
                && !statePropKeys.includes(propKey)
                && !callbackPropKeys.includes(propKey)) {
                baseComponentProps[propKey] = props[propKey];
            }
            return baseComponentProps;
        }, {});
    }, [props]);

    /**
     * Parse stateful field props
     *
     * any prop that can change over time and will effect state of field
     */
    const fieldStateProps = useMemo(() => {
        const stateProps = Object.keys(props).reduce((stateProps, propKey) => {
            if (statePropKeys.includes(propKey)) {
                stateProps[propKey] = props[propKey];
            }
            return stateProps;
        }, {});

        const {isSelectableGroup, isMultipleChoice: isMultipleChoiceField} = fieldOptions;
        const {isDisabled, isMultipleChoice, ...restStateProps} = stateProps;

        return {
            ...restStateProps,
            isDisabled: typeof isDisabled === 'boolean' ? isDisabled : false,
            ...(isSelectableGroup && {
                isMultipleChoice: typeof isMultipleChoice === 'boolean'
                    ? isMultipleChoice
                    : (typeof isMultipleChoiceField === 'boolean' ? isMultipleChoiceField : false),
            }),
        };
    }, [props, fieldOptions]);

    /**
     * Parse registry field props
     *
     * any prop that will remain static over field lifetime + initial field options
     */
    const fieldRegistryProps = useMemo(() => {
        const registryPropsWithName = Object.keys(props).reduce((registryProps, propKey) => {
            if (registryPropKeys.includes(propKey)) {
                registryProps[propKey] = props[propKey];
            }
            return registryProps;
        }, {});
        const {name: fieldName, ...registryProps} = registryPropsWithName;
        const {formName} = formContext;
        const {selectableGroupName, isGroupMultipleChoice, isGroupDisabled} = selectableContext;
        const {isSelectable, isSelectableGroup} = fieldOptions;
        const {value, isSelected, isMultipleChoice} = fieldStateProps;
        const {defaultValue, defaultIsSelected, isComposedIn} = registryProps;

        const isControlled = isComposedIn
            || !!formName
            || !!selectableGroupName
            // if isSelected/value props are set, something is controlling field
            || (isSelectable ? typeof isSelected === 'boolean' : (typeof value !== 'undefined' && value !== null));

        let initialValue = isControlled ? value : (defaultValue || '');
        initialValue = !isSelectableGroup || (isSelectableGroup && !isMultipleChoice)
            ? initialValue
            : (Array.isArray(initialValue)
                ? initialValue
                : (typeof initialValue !== 'undefined' && initialValue !== null ? [initialValue] : []));

        let initialIsSelected = isControlled
            ? isSelected : (typeof defaultIsSelected === 'boolean' ? defaultIsSelected : false);
        initialIsSelected = !isSelectable
            ? undefined : (typeof initialIsSelected === 'boolean' ? initialIsSelected : false);

        return {
            hasRegistry: true,
            fieldName,
            isControlled,
            ...registryProps,
            ...fieldOptions,
            initialValue,
            initialIsSelected,
            selectableGroupName,
            isGroupMultipleChoice,
            isGroupDisabled,
        };
    }, [props, fieldOptions, fieldStateProps, formContext, selectableContext]);

    /**
     * Current field state
     */
    const currentRegistryProps = formFieldRegistry[fieldName]
        || optionFieldRegistry[fieldName]
        || fieldRegistryRef.current;
    const currentStateProps = currentRegistryProps.isControlled
        ? (formFieldStates[fieldName] || optionFieldStates[fieldName] || {...fieldStateProps, ...fieldState})
        : fieldState;
    const {hasRegistry} = currentRegistryProps;

    /**
     * Sets field state
     *
     * @param {Object} stateObject
     */
    const setFieldState = useCallback(stateObject => {
        updateFieldState(fieldState => ({
            ...fieldState,
            ...stateObject,
        }));
    }, []);

    /**
     * Register field
     */
    useEffect(() => {
        const {fieldName, isControlled, isComposedIn} = fieldRegistryProps;
        const {initialValue, initialIsSelected} = fieldRegistryProps;
        const {selectableGroupName, registerOptionField} = selectableContext;
        const {formName, registerFormField, setFormFieldState} = formContext;

        if (hasRegistry) return;

        // selectable group field, state controlled by SelectableContext
        if (isControlled && selectableGroupName && !isComposedIn) {
            registerOptionField(fieldRegistryProps, fieldStateProps);
            return;
        }

        // field controlled by FormContext
        if (isControlled && formName && !isComposedIn) {
            registerFormField(fieldName, fieldRegistryProps);
            setFormFieldState(fieldName, {
                ...fieldStateProps,
                value: initialValue,
                isSelected: initialIsSelected,
            });
            return;
        }

        // field controlled by parent component
        if (isControlled) {
            fieldRegistryRef.current = fieldRegistryProps;
            setFieldState({}); // force re-render
            return;
        }

        // uncontrolled component
        if (!isControlled) {
            fieldRegistryRef.current = fieldRegistryProps;
            setFieldState({
                ...fieldStateProps,
                value: initialValue,
                isSelected: initialIsSelected,
            });
        }
    }, [hasRegistry, fieldRegistryProps, fieldStateProps, setFieldState, formContext, selectableContext]);

    /**
     * Field onChange prop
     *
     * @param {boolean|*} newValue - new `value` or `isSelected` state
     */
    const onChange = useCallback(newValue => {
        const {onChange} = props;
        const {fieldName, isSelectable, isComposedIn, isControlled} = currentRegistryProps;
        const {formName, setFormFieldState} = formContext;
        const {selectableGroupName, setOptionFieldValue} = selectableContext;

        // selectable group field, state controlled by SelectableContext
        if (selectableGroupName && isControlled && !isComposedIn) {
            if (typeof onChange === 'function') onChange(newValue);
            setOptionFieldValue({
                fieldName,
                isSelected: newValue,
            });
            return;
        }

        // field controlled by FormContext
        if (formName && isControlled && !isComposedIn) {
            if (typeof onChange === 'function') onChange(newValue);
            setFormFieldState(fieldName, {
                ...(!isSelectable ? {value: newValue} : {isSelected: newValue}),
                isTouched: true,
            });
            return;
        }

        // field controlled by parent component
        if (isControlled) {
            if (typeof onChange === 'function') onChange(newValue);
            return;
        }

        // uncontrolled component
        if (!isControlled) {
            if (typeof onChange === 'function') onChange(newValue);
            setFieldState({
                ...(!isSelectable ? {value: newValue} : {isSelected: newValue}),
            });
        }
    }, [props, currentRegistryProps, formContext, selectableContext, setFieldState]);

    /**
     * Field submitForm prop
     */
    const submitForm = useCallback(event => {
        const {submitForm} = formContext;
        submitForm(event);
    }, [formContext]);

    /**
     * Return useField effect values
     */
    return {
        fieldName,
        fieldProps: {
            ...currentRegistryProps,
            ...currentStateProps,
            onChange: currentStateProps.isDisabled ? null : onChange,
            submitForm: currentStateProps.isDisabled ? null : submitForm,
        },
        baseComponentProps,
    };
};

export default useField;


