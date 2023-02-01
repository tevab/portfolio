import React from 'react';
import AboutImage from '../components/AboutImage';
import AboutInfo from '../components/AboutInfo';
import { Column, Wrapper } from '../styles/Theme';

const About = () => {
    return (
        <Wrapper variant='full'>
            <Wrapper variant='flex'>
                <Column variant='wide'>
                    <AboutInfo />
                </Column>
                <Column variant='narrowAbout'>
                    <AboutImage />
                </Column>
            </Wrapper>
        </Wrapper>
    );
};

export default About;
