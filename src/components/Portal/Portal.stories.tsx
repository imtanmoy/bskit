import { Story, Meta } from '@storybook/react/types-6-0';
import * as React from 'react';
import Portal from './index';

export default {
    title: 'Example/Portal',
    component: Portal,
} as Meta;

const Template: Story = () => {
    return (
        <Portal>
            <div style={{ background: 'red', color: 'black', position: 'absolute', height: '100px' }}>
                This div is inside of a portal
            </div>
        </Portal>
    );
};

export const Basic = Template.bind({});
