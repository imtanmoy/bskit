import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Button from './index';

export default {
    title: 'Example/Button',
    component: Button,
} as Meta;

const Template: Story = (args) => <Button label={args.label} {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    type: 'primary',
    label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
    size: 'large',
    label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
    size: 'small',
    label: 'Button',
};
