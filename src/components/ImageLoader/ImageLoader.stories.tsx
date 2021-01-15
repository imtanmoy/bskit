import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import ImageLoader from './index';
import Spinner from '../Spinner';

export default {
    title: 'Example/ImageLoader',
    component: ImageLoader,
} as Meta;

const Template: Story = (args) => <ImageLoader src={args.src} {...args} />;

const ErrorRender = () => {
    return (
        <div>
            <span>Can not load image</span>
        </div>
    );
};

export const Basic = Template.bind({});
Basic.args = {
    src: 'https://unsplash.it/200/200?random',
    height: '500px',
    width: '500px',
    // eslint-disable-next-line react/display-name
    errorRender: <ErrorRender />,
    loadingRender: <Spinner />,
};
