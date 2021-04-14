import React, {Fragment} from 'react';
import {Checkbox, ToggleSwitch} from '@computerrock/test-ui-lib';

const DashboardScreen = () => {
    return (
        <Fragment>
            Dashboard view.<br />
            <Checkbox defaultIsSelected={true}>
                check it?
            </Checkbox><br />
            <ToggleSwitch>toggle</ToggleSwitch>
        </Fragment>
    );
};

export default DashboardScreen;
