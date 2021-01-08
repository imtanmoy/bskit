import { Story, Meta } from '@storybook/react/types-6-0';
import * as React from 'react';
import Tooltip from './index';

export default {
    title: 'Example/Tooltip',
    component: Tooltip,
} as Meta;

const Template: Story = (args) => (
    <Tooltip {...args} title={args.title}>
        {args.children}
    </Tooltip>
);

export const Hover = Template.bind({});
Hover.args = {
    title: 'LLLLLL',
    children: <button>Hover me</button>,
    placement: 'right',
};
