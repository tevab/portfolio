import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Colors } from '../styles/GlobalVariables';
import { AppContext } from './Layout';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
`;

interface CircleProps {
    key: number;
    colors: {
        fonts: { text: string; nav: string };
        backgrounds: {
            home: string;
            work: string;
            about: string;
            resume: string;
        };
        borders: string;
        black: string;
    };
    style: {
        width: string;
        height: string;
        filter: string;
        top: string;
        left: string;
    };
    page: string;
    direction: string;
    speed: number;
    newDirection?: string;
}

const Circle = styled.div<CircleProps>`
    display: block;
    background-color: ${(props) =>
        props.page === 'home'
            ? props.colors.backgrounds.home
            : props.page === 'work'
            ? props.colors.backgrounds.work
            : props.page === 'about'
            ? props.colors.backgrounds.about
            : props.page === 'resume'
            ? props.colors.backgrounds.resume
            : null};
    position: absolute;
    border-radius: 50%;
    transform-origin: 20vh 20vw;
    animation: ${rotate} infinite ${(props) => props.speed}s ease-in-out;
    animation-direction: ${(props) => props.newDirection};
`;

interface AppContextType {
    page: string;
    responsive: string | null;
}

const Background = () => {
    const colors = useContext(Colors);
    const context = useContext(AppContext);
    if (context === null) return null;
    const { page, responsive } = context as AppContextType;
    const [circles, setCircles] = useState<React.ReactElement[]>([]);

    const randomize = (min: number, max: number) => {
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        return random;
    };

    useEffect(() => {
        const minElements = 6;
        const maxElements = 10;
        const randomAmount = randomize(minElements, maxElements);
        const elements = [];
        for (let i = 0; i < randomAmount; i++) {
            const randomSize = randomize(14, 50);
            const randomSpeed = randomize(20, 40);
            const randomPositionY = randomize(0, 20);
            const randomPositionX = randomize(0, 100);
            const newDirection = Math.random() > 0.5 ? 'forward' : 'reverse';
            elements.push(
                <Circle
                    key={i}
                    colors={colors}
                    style={{
                        width: `${randomSize}vw`,
                        height: `${randomSize}vw`,
                        filter: `blur(20px) brightness(0.6)`,
                        top: `${randomPositionY}vh`,
                        left: `${randomPositionX}vw`,
                    }}
                    page={page}
                    direction={newDirection}
                    speed={randomSpeed}
                />
            );
        }
        setCircles(elements);
    }, [responsive]);

    return (
        <ul
            style={{
                
            }}
        >
            {circles.map((el, i) => {
                return (
                    <li key={i} style={{ filter: `contrast(20)` }}>
                        {el}
                    </li>
                );
            })}
        </ul>
    );
};

export default Background;
