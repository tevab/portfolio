import { useContext, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Colors } from '@/styles/GlobalVariables';
import { AppContext } from './Layout';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
`;

const Circle = styled.div`
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
    animation: ${rotate} infinite 30s ease-in-out;
    animation-direction: ${(props) => props.newDirection};
`;

const Background = () => {
    const colors = useContext(Colors);
    const { page } = useContext(AppContext);
    const [circles, setCircles] = useState([]);

    const randomize = (min, max) => {
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        return random;
    };

    useEffect(() => {
        const minElements = 6;
        const maxElements = 8;
        const randomAmount = randomize(minElements, maxElements);
        const elements = [];
        for (let i = 0; i < randomAmount; i++) {
            const randomSize = randomize(20, 52);
            const randomPositionY = randomize(0, 20);
            const randomPositionX = randomize(0, 60);
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
                />
            );
        }
        setCircles(elements);
    }, []);

    return (
        <ul
            style={{
                listStyle: 'none',
                padding: 0,
                zIndex: -1,
                position: 'absolute',
                mixBlendMode: 'multiply',
                opacity: 0.4,
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transform: 'translateY(-25vh) translateX(-25vw)',
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
