import React, {useRef, useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import SelectableContext from './SelectableContext';

const SelectableGroup = React.forwardRef((props, ref) => {
    const optionFieldRegistryRef = useRef({});
    const [optionFieldStates, updateOptionFieldStates] = useState({});
    const isTouchedRef = useRef(false);

    const {baseComponent: BaseComponent, baseComponentProps, fieldProps} = props;
    const {fieldName: selectableGroupName, onChange} = fieldProps;
    const {isDisabled: isGroupDisabled, isMultipleChoice: isGroupMultipleChoice} = fieldProps;
    const {value: groupValue, defaultValue: groupDefaultValue, isControlled: isGroupControlled} = fieldProps;

    /**
     * Registers selectable option field and its initial state
     *
     * @param {string} fieldName
     * @param {*} value
     * @param {boolean} isSelected
     */
    const registerOptionField = useCallback((fieldRegistryProps, fieldStateProps) => {
        const {fieldName} = fieldRegistryProps;
        const {value, isSelected} = fieldStateProps;
        if (!selectableGroupName || !fieldName) return;

        let optionIsSelected;
        // a. if group field is controlled
        // b. if group field is uncontrolled & defaultValue is set
        // set option's isSelected state if it is found in group's value (a) or defaultValue (b)
        if (isGroupControlled || (!isGroupControlled && typeof groupDefaultValue !== 'undefined')) {
            const selectableGroupValue = isGroupControlled ? groupValue : groupDefaultValue;
            optionIsSelected = isGroupMultipleChoice && Array.isArray(selectableGroupValue)
                ? selectableGroupValue.includes(value) : selectableGroupValue === value;
        }
        // c. if group field is uncontrolled & defaultValue is not set option's isSelected state from prop
        if (!isGroupControlled && typeof groupDefaultValue === 'undefined') {
            optionIsSelected = typeof isSelected !== 'boolean' ? false : isSelected;
        }

        if (!optionFieldRegistryRef.current[fieldName]) {
            optionFieldRegistryRef.current[fieldName] = {
                ...fieldRegistryProps,
                name: fieldName,
                initialIsSelected: optionIsSelected,
            };
        }

        if (!optionFieldStates[fieldName]) {
            updateOptionFieldStates(optionFieldStates => mapOptionFieldSelectedState({
                fieldName,
                isSelected: optionIsSelected,
                fieldStates: fieldStateProps,
                optionFieldStates,
                isGroupMultipleChoice,
            }));
        }
        // eslint-disable-next-line max-len
    }, [optionFieldStates, selectableGroupName, groupValue, groupDefaultValue, isGroupMultipleChoice, isGroupControlled]);

    /**
     * Unregisters selectable option field
     *
     * @param {string} fieldName
     */
    const unregisterOptionField = useCallback(fieldName => {
        delete optionFieldRegistryRef.current[fieldName];

        updateOptionFieldStates(optionFieldStates => {
            const {[fieldName]: remove, ...restOptionFieldValues} = optionFieldStates;
            return restOptionFieldValues;
        });
    }, []);

    /**
     * Parses group value from field states while respecting isGroupMultipleChoice setting
     *
     * @param {Object} fieldStates
     * @param {boolean} isGroupMultipleChoice
     */
    const getSelectableGroupValue = (fieldStates, isGroupMultipleChoice) => {
        let selectableGroupValue;

        if (isGroupMultipleChoice) {
            selectableGroupValue = [];
            Object.keys(fieldStates).forEach(optionFieldName => {
                const {value, isSelected} = fieldStates[optionFieldName];
                if (fieldStates[optionFieldName] && isSelected) selectableGroupValue.push(value);
            });
            selectableGroupValue = [...new Set(selectableGroupValue)];
        }

        if (!isGroupMultipleChoice) {
            selectableGroupValue = Object
                .keys(fieldStates)
                .reduce((newValue, optionFieldName) => {
                    const {value, isSelected} = fieldStates[optionFieldName];
                    if (fieldStates[optionFieldName] && isSelected) newValue = value;
                    return newValue;
                }, undefined);
        }

        return selectableGroupValue;
    };

    /**
     * Maps (un)selected option field to state while respecting isGroupMultipleChoice setting
     *
     * @param fieldName
     * @param isSelected
     * @param fieldStates - state for field
     * @param optionFieldStates - state for all options
     * @param isGroupMultipleChoice
     */
    const mapOptionFieldSelectedState = ({
        fieldName,
        isSelected,
        fieldStates,
        optionFieldStates,
        isGroupMultipleChoice
    }) => {
        return ({
            ...(!isGroupMultipleChoice
                // unselected other fields if group is not multiple choice
                ? Object.keys(optionFieldStates).reduce((unselectedOptionFields, optionFieldName) => {
                    if (optionFieldName !== fieldName) {
                        unselectedOptionFields[optionFieldName] = {
                            ...optionFieldStates[optionFieldName],
                            isSelected: false,
                        };
                    }
                    return unselectedOptionFields;
                }, {})
                // just re-map if group is multiple choice
                : optionFieldStates),
            [fieldName]: {
                ...optionFieldStates[fieldName],
                ...fieldStates,
                ...(typeof isSelected !== 'undefined' && {isSelected}),
            },
        });
    };

    /**
     * Returns option field state for controlled SelectableGroup
     */
    const getControlledGroupOptionFieldStates = useCallback(() => {
        const optionFieldRegistry = optionFieldRegistryRef.current;

        return Object.keys(optionFieldRegistry).reduce((newOptionFieldStates, optionFieldName) => {
            const {value} = optionFieldStates[optionFieldName];
            const optionIsSelected = isGroupMultipleChoice && Array.isArray(groupValue)
                ? groupValue.includes(value) : groupValue === value;
            newOptionFieldStates[optionFieldName] = {
                ...optionFieldStates[optionFieldName],
                isSelected: optionIsSelected,
            };
            return newOptionFieldStates;
        }, {});
    }, [groupValue, optionFieldRegistryRef, optionFieldStates, isGroupMultipleChoice]);

    /**
     * Sets option field value
     *
     * @param {string} fieldName
     * @param {boolean} isSelected
     */
    const setOptionFieldValue = useCallback(({fieldName, isSelected}) => {
        if (typeof optionFieldRegistryRef.current[fieldName] === 'undefined') return;

        if (!isGroupControlled) {
            isTouchedRef.current = true;
            updateOptionFieldStates(optionFieldStates => mapOptionFieldSelectedState({
                fieldName,
                isSelected,
                optionFieldStates,
                isGroupMultipleChoice,
            }));
        }

        if (isGroupControlled && typeof onChange === 'function') {
            let optionFieldStates = getControlledGroupOptionFieldStates();
            optionFieldStates = mapOptionFieldSelectedState({
                fieldName,
                isSelected,
                optionFieldStates,
                isGroupMultipleChoice,
            });

            onChange(getSelectableGroupValue(optionFieldStates, isGroupMultipleChoice));
        }
    }, [getControlledGroupOptionFieldStates, isGroupMultipleChoice, isGroupControlled, onChange]);

    /**
     * Uncontrolled SelectableGroup onChange handler
     */
    useEffect(() => {
        if (!isGroupControlled && typeof onChange === 'function' && isTouchedRef.current) {
            onChange(getSelectableGroupValue(optionFieldStates, isGroupMultipleChoice));
        }
    }, [optionFieldStates, isGroupControlled, isGroupMultipleChoice, onChange]);

    return (
        <SelectableContext.Provider
            value={{
                selectableGroupName,
                optionFieldRegistry: optionFieldRegistryRef.current,
                optionFieldStates: !isGroupControlled ? optionFieldStates : getControlledGroupOptionFieldStates(),
                registerOptionField,
                unregisterOptionField,
                setOptionFieldValue,
                isGroupDisabled, // TODO
                isGroupMultipleChoice, // TODO
            }}
        >
            <BaseComponent
                {...baseComponentProps}
                {...fieldProps}
                ref={ref}
                name={selectableGroupName}
                // TODO reducing options states to render props??
            />
        </SelectableContext.Provider>
    );
});

SelectableGroup.displayName = 'SelectableGroup';

SelectableGroup.propTypes = {
    name: PropTypes.string,
    baseComponent: PropTypes.any.isRequired, // should be of element type, but doesn't play well with forwardRef
    baseComponentProps: PropTypes.object.isRequired,
    fieldProps: PropTypes.object.isRequired,
};

SelectableGroup.defaultProps = {
    name: '',
};

export default SelectableGroup;
