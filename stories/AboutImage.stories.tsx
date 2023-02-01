import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AboutImage from '../components/AboutImage';

export default {
    title: 'About Image',
    component: AboutImage,
    argTypes: {
        background: {
            options: ['default', 'ireland', 'jungle', 'rocky'],
            control: { type: 'radio' },
        },
    },
} as ComponentMeta<typeof AboutImage>;

const Template: ComponentStory<typeof AboutImage> = (args) => (
    <AboutImage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    background: 'default',
};
