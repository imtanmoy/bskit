import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import AvatarSelector from './index';

export default {
    title: 'Example/AvatarSelector',
    component: AvatarSelector,
} as Meta;

const Template: Story = (args) => <AvatarSelector src={args.src} onChange={args.onChange} {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    src: 'https://unsplash.it/200/200?random',
    size: 200,
    onChange: (file: File) => {
        console.log(file);
    },
};

export const Large = Template.bind({});
Large.args = {
    src: 'https://unsplash.it/200/200?random',
    size: 'lg',
    onChange: (file: File) => {
        console.log(file);
    },
};
