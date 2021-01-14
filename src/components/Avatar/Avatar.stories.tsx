import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Avatar from './index';

export default {
    title: 'Example/Avatar',
    component: Avatar,
} as Meta;

const Template: Story = (args) => <Avatar src={args.src} {...args} />;

export const Small = Template.bind({});
Small.args = {
    src: 'https://unsplash.it/200/200?random',
    size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
    src: 'https://unsplash.it/200/200?random',
    size: 'lg',
};

export const Sqaure = Template.bind({});
Sqaure.args = {
    src: 'https://unsplash.it/200/200?random',
    size: 'md',
    shape: 'square',
    name: 'Tanmoy Banik',
};

export const WithInitials = Template.bind({});
WithInitials.args = {
    size: 500,
    name: 'Tanmoy Banik',
};

export const WithInitialsSM = Template.bind({});
WithInitialsSM.args = {
    size: 'sm',
    name: 'Tanmoy Banik',
};

export const ClassName = Template.bind({});
ClassName.args = {
    size: 'sm',
    src: 'https://unsplash.it/200/200?random',
    className: 'avatar-wrapper',
};
