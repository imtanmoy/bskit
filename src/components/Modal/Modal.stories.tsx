import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Modal from './index';

export default {
    title: 'Example/Modal',
    component: Modal,
} as Meta;

const Template: Story = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
