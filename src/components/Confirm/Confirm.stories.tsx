import { Story, Meta } from '@storybook/react/types-6-0';
import * as React from 'react';
import Button from '../Button';
import confirm, { ConfirmProps } from './index';

export default {
    title: 'Example/Confirm',
} as Meta;

const Template: Story = (args) => {
    const onClick = () => {
        confirm({
            ...(args as ConfirmProps),
        });
    };
    return (
        <div>
            <Button label="Delete" onClick={onClick} />
        </div>
    );
};

export const Confirm = Template.bind({});
Confirm.args = {
    title: 'Are You Sure?',
    content: 'This could be a problem',
    onOk: () => {
        console.log('OK');
    },
    onCancel: () => {
        console.log('Cancel');
    },
};
