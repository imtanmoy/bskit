import { Story, Meta } from '@storybook/react/types-6-0';
import * as React from 'react';
import { default as ToolTip } from './index';

export default {
    title: 'Example/Tooltip',
    component: ToolTip,
} as Meta;

const Template: Story = (args) => (
    <ToolTip {...args} title={args.title}>
        {args.children}
    </ToolTip>
);

export const Tooltip = Template.bind({});
Tooltip.args = {
    title: 'This is the title of the tooltip',
    children: <button>Hover me</button>,
    placement: 'right',
};
