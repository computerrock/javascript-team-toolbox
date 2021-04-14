import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {renderRoutes} from 'react-router-config';
import '@computerrock/test-ui-lib/index.scss';

const ApplicationScreen = ({route}) => {
    return (
        <Fragment>
            {renderRoutes(route.routes)}
        </Fragment>
    );
};

ApplicationScreen.propTypes = {
    route: PropTypes.object.isRequired,
    // someStateValue: PropTypes.object,
};

ApplicationScreen.defaultProps = {
    // no-op
    // someStateValue: null,
};

const mapStateToProps = state => ({
    // no-op
    // someStateValue: state.domain.someStateValue
});

const mapDispatchToProps = dispatch => ({
    // no-op
    // callAction: payload => dispatch({
    //     type: someActionTypes.CALL_ACTION,
    //     payload,
    // }),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ApplicationScreen);
