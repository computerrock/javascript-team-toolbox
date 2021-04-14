import React from 'react';
import PropTypes from 'prop-types';
import {isValidElementType} from 'react-is';
import useField from './useField';
import SelectableGroup from './SelectableGroup';
// import ValidationGroup from './ValidationGroup';

/**
 * @typedef {Object} FieldOptions
 * @property {boolean} [isSelectable]
 * @property {boolean} [isSelectableGroup]
 * @property {boolean} [isMultipleChoice]
 * @property {boolean} [isValidationGroup]
 * @property {boolean} [isSubmitButton]
 */

/**
 * Connects form field with referenced context
 *
 * @param {(FieldOptions|function)} hocParams form field options or components
 * @returns {*}
 */
export const withFormContext = hocParams => {
    const BaseComponent = isValidElementType(hocParams) ? hocParams : null;

    const wrapBaseComponent = BaseComponent => {
        const fieldOptions = isValidElementType(hocParams) ? {} : hocParams;

        const ComposedComponent = React.forwardRef((props, ref) => {
            const {fieldName, fieldProps, baseComponentProps} = useField(props, fieldOptions);

            // return null if field is not ready
            if (!fieldProps.hasRegistry) return null;

            // TODO return validationGroup component
            // if (isValidationGroup) {
            //     return (
            //         <ValidationGroup
            //             ref={ref}
            //             fieldName={fieldName}
            //             baseComponent={BaseComponent}
            //             baseComponentProps={baseComponentProps}
            //             fieldProps={fieldProps}
            //         />
            //     );
            // }

            // return SelectableGroup component
            if (fieldOptions.isSelectableGroup) {
                return (
                    <SelectableGroup
                        ref={ref}
                        name={fieldName}
                        baseComponent={BaseComponent}
                        baseComponentProps={baseComponentProps}
                        fieldProps={fieldProps}
                    />
                );
            }

            // return enhanced BasedComponent (default)
            return (
                <BaseComponent
                    {...baseComponentProps}
                    {...fieldProps}
                    ref={ref}
                    name={fieldName}
                />
            );
        });

        ComposedComponent.displayName = `withFormContext(${BaseComponent.displayName || BaseComponent.name})`;

        ComposedComponent.propTypes = {
            ...BaseComponent.propTypes,
        };

        ComposedComponent.defaultProps = {
            ...BaseComponent.defaultProps,
        };

        return ComposedComponent;
    };

    // return wrapped component
    if (BaseComponent) {
        return wrapBaseComponent(BaseComponent);
    }

    // return component wrapping method
    return wrapBaseComponent;
};

export const withFormContextPropTypes = {
    name: PropTypes.string,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    isSelected: PropTypes.bool,
    defaultIsSelected: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isMultipleChoice: PropTypes.bool,
    isComposedIn: PropTypes.bool,
    onChange: PropTypes.func,
    submitForm: PropTypes.func,
    validate: PropTypes.func,
    isValid: PropTypes.bool,
    errors: PropTypes.arrayOf(PropTypes.string),
};

export const withFormContextDefaultProps = {
    name: '',
    value: undefined,
    defaultValue: undefined,
    isSelected: undefined,
    defaultIsSelected: undefined,
    isDisabled: undefined,
    isMultipleChoice: undefined,
    isComposedIn: undefined,
    onChange: () => null,
    submitForm: () => null,
    validate: () => null,
    isValid: true,
    errors: [],
};
