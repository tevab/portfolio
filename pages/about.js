import React, { useState, createContext, useEffect } from 'react';
import AboutImage from '../components/AboutImage';
import AboutInfo from '../components/AboutInfo';
import { Column, Wrapper } from '../styles/Theme';

export const AboutContext = createContext();

const About = () => {
    const [localBackground, setLocalBackground] = useState('default');
    const [prevBackground, setPrevBackroud] = useState(null);
    const [swipe, setSwipe] = useState(false);
    const [index, setIndex] = useState(0);

    const info = [
        {
            fact: 'default',
            title: `Hi! I'm Teva`,
            body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`,
        },
        {
            fact: 'ireland',
            title: `I used to be professional Irish Dancer`,
            body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`,
        },
        {
            fact: 'jungle',
            title: `I collect plants`,
            body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`,
        },
        {
            fact: 'rocky',
            title: `I used to play Frank-N-Furter in a Rocky Horror Picture Show cast`,
            body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`,
        },
    ];

    const handleImageChange = (value) => {
        setPrevBackroud(localBackground);
        setLocalBackground(value);
    };

    useEffect(() => {
        handleImageChange(info[index].fact);
    }, [index]);

    return (
        <AboutContext.Provider
            value={{
                localBackground,
                setLocalBackground,
                swipe,
                setSwipe,
                prevBackground,
                setPrevBackroud,
                index,
                setIndex,
                info,
            }}
        >
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
        </AboutContext.Provider>
    );
};

export default About;
