import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const DemoModal = () => {
    return (
        <Fragment>
            Demo modal (TODO)
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
