import { Story, Meta } from '@storybook/react/types-6-0';
import * as React from 'react';
import Popover from './index';

export default {
    title: 'Example/Popover',
    component: Popover,
} as Meta;

const Template: Story = () => <Popover title="Popover Title" content="Popover Content" />;

export const Basic = Template.bind({});
