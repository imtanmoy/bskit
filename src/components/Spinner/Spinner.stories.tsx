import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Spinner from './index';

export default {
    title: 'Example/Spinner',
    component: Spinner,
} as Meta;

const Template: Story = () => <Spinner />;

export const Primary = Template.bind({});
