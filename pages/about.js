import React from 'react';
import AboutImage from '../components/AboutImage';
import { Column, Wrapper } from '../styles/Theme';

const About = () => {
    return (
        <Wrapper variant='full'>
            <Wrapper variant='flex'>
                <Column variant='wide'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </Column>
                <Column variant='narrowAbout'>
                    <AboutImage />
                </Column>
            </Wrapper>
        </Wrapper>
    );
};

export default About;
