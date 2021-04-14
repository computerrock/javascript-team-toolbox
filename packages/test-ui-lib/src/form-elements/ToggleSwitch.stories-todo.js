import React from 'react';
import ToggleSwitch from './ToggleSwitch';

export default {
    title: 'Example/ToggleSwitch',
    component: ToggleSwitch,
    argTypes: {
        // backgroundColor: { control: 'color' },
    },
};

const Template = args => (
    <ToggleSwitch {...args} />
);

export const Test = Template.bind({});
Test.args = {
    primary: true,
    label: 'Button',
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };
//
// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };
//
// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
