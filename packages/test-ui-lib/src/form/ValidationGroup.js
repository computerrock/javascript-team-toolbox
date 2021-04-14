import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import FormContext from './FormContext';
import ValidationContext from './ValidationContext';

// TODO
const ValidationGroup = props => {
    const {baseComponent: BaseComponent, baseComponentProps, fieldProps} = props;
    const {fieldName: validationGroupName} = fieldProps;
    const {fieldRegistry} = useContext(FormContext);

    return (
        <ValidationContext.Provider
            value={{
                validationGroupName: fieldName,
                isGroupValid: formField ? formField.isValid : undefined,
                groupErrors: formField ? formField.errors : [],
            }}
        >
            <BaseComponent
                {...baseComponentProps}
                fieldRef={formField ? formField.fieldRef : null}
                isValid={formField ? formField.isValid : true}
                errors={formField ? formField.errors : []}
            />
        </ValidationContext.Provider>
    );
};

ValidationGroup.displayName = 'ValidationGroup';

ValidationGroup.propTypes = {
    fieldName: PropTypes.string,
    baseComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    baseComponentProps: PropTypes.object.isRequired,
    fieldProps: PropTypes.object.isRequired,
};

ValidationGroup.defaultProps = {
    formContextOptions: {},
};

export default ValidationGroup;
