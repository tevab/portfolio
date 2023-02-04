import React, { useState, createContext } from 'react';
import AboutImage from '../components/AboutImage';
import AboutInfo from '../components/AboutInfo';
import { Column, Wrapper } from '../styles/Theme';

export const AboutContext = createContext();

const About = () => {
    const [localBackground, setLocalBackground] = useState('default');
    const [prevBackground, setPrevBackroud] = useState(null);
    const [swipe, setSwipe] = useState(false);

    const handleImageChange = (value) => {
        setPrevBackroud(localBackground);
        setLocalBackground(value);
    };

    return (
        <AboutContext.Provider
            value={{
                localBackground,
                setLocalBackground,
                swipe,
                setSwipe,
                prevBackground,
                setPrevBackroud,
            }}
        >
            <Wrapper variant='full'>
                <Wrapper variant='flex'>
                    <Column variant='wide'>
                        prev: {prevBackground} current: {localBackground}
                        <br />
                        <button onClick={() => handleImageChange('default')}>
                            default
                        </button>
                        <button onClick={() => handleImageChange('ireland')}>
                            ireland
                        </button>
                        <button onClick={() => handleImageChange('jungle')}>
                            jungle
                        </button>
                        <button onClick={() => handleImageChange('rocky')}>
                            rocky
                        </button>
                        <br />
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
