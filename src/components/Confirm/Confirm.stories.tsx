import { Story, Meta } from '@storybook/react/types-6-0';
import * as React from 'react';
import confirm from './index';

export default {
    title: 'Example/Confirm',
} as Meta;

const Template: Story = () => {
    const onClick = () => {
        confirm({
            title: 'Are You Sure?',
            content: 'This could be a problem',
            onOk: () => {
                console.log('OK');
            },
            onCancel: () => {
                console.log('Cancel');
            },
        });
    };
    return (
        <div>
            <button onClick={onClick}>Click Here</button>
        </div>
    );
};

export const Confirm = Template.bind({});
Confirm.args = {
    title: 'LLLLLL',
    message: 'dsdsdsd',
};
