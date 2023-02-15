import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const DemoModal = ({hasBackdrop}) => {
    return (
        <Fragment>
            Demo modal (TODO)
            {hasBackdrop}
        </Fragment>
    );
};

DemoModal.propTypes = {
    hasBackdrop: PropTypes.bool,
};

DemoModal.defaultProps = {
    hasBackdrop: true,
};

export default DemoModal;
