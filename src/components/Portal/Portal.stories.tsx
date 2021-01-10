import { Story, Meta } from '@storybook/react/types-6-0';
import * as React from 'react';
import { default as PortalAlias } from './index';

export default {
    title: 'Example/Portal',
    component: PortalAlias,
} as Meta;

const Template: Story = () => {
    return (
        <PortalAlias>
            <div style={{ background: 'red', color: 'black', position: 'absolute', height: '100px' }}>
                This div is inside of a portal
            </div>
        </PortalAlias>
    );
};

Template.storyName = 'Portal';

export const Portal = Template.bind({});
