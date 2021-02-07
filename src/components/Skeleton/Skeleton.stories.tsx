import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Skeleton from './index';

export default {
    title: 'Example/Skeleton',
    component: Skeleton,
} as Meta;

const Template: Story = (args) => <Skeleton {...args} />;

const Template1: Story = (args) => (
    <div style={{ width: '500px', height: '300px' }}>
        <Skeleton {...args} />
    </div>
);
export const Default = Template1.bind({});
Default.args = {
    size: 300,
};

export const Circular = Template.bind({});
Circular.args = {
    shape: 'circular',
    size: 100,
};

export const Reactangular = Template.bind({});
Reactangular.args = {
    shape: 'rectangular',
    size: 300,
};
