import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {renderRoutes} from 'react-router-config';
import '../ui-components/index.scss';

const ApplicationView = ({route}) => {
    return (
        <Fragment>
            {renderRoutes(route.routes)}
        </Fragment>
    );
};

ApplicationView.propTypes = {
    route: PropTypes.object.isRequired,
    // someStateValue: PropTypes.object,
};

ApplicationView.defaultProps = {
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
)(ApplicationView);
