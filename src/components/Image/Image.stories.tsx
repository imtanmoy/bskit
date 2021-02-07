import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Image from './index';

export default {
    title: 'Example/Image',
    component: Image,
} as Meta;

const Template: Story = (args) => <Image src={args.src} {...args} />;

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
    // loadingRender: <Spinner />,
};
