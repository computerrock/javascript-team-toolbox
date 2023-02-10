import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {renderRoutes} from '@computerrock/formation-router';
import '@computerrock/formation-ui/index.module.scss';

const ApplicationScreen = ({route}) => {
    return (
        <Fragment>
            Application: <br />a
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
