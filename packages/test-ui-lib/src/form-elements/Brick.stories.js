import React from 'react';
import Brick from './Brick';

export default {
    title: 'Example/Brick',
    component: Brick,
    argTypes: {
        backgroundColor: {control: 'color'},
    },
};

const Template = (args) => <Brick {...args} />;

export const PrimaryBrick = Template.bind({});
PrimaryBrick.args = {
    primary: true,
    label: 'Brick',
    children: 'This is a brick!',
};
