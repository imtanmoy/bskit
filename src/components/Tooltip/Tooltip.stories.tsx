import { Story, Meta } from '@storybook/react/types-6-0';
import * as React from 'react';
import * as ToolTip from './index';

export default {
    title: 'Example/Tooltip',
    component: ToolTip.default,
} as Meta;

const Template: Story = (args) => (
    <Tooltip {...args} title={args.title}>
        {args.children}
    </Tooltip>
);

export const Tooltip = Template.bind({});
Tooltip.args = {
    title: 'LLLLLL',
    children: <button>Hover me</button>,
    placement: 'right',
};
