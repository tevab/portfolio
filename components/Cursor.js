import React, { useContext } from 'react';
import { Colors } from '@/styles/GlobalVariables';
import { AppContext } from './Layout';
import CursorImage from '../public/svg/CursorImage';
import styled from '@emotion/styled';
import Lottie from 'lottie-react';
import cursorClick from '../public/lottie/cursorClick.json';

const StyledCursor = styled(CursorImage)`
    position: absolute;
    mix-blend-mode: multiply;
    opacity: 0.4;
    z-index: 10;
    pointer-events: none;
    transition: transform 400ms ease-in-out;
`;

const StyledLottie = styled(Lottie)`
    position: absolute;
    mix-blend-mode: multiply;
    opacity: 0.4;
    z-index: 10;
    pointer-events: none;
    width: 54px;
    height: 54px;
    transition: transform 400ms ease-in-out;
`;

const Cursor = () => {
    const colors = useContext(Colors);
    const { clicked, hovered } = useContext(AppContext);

    const useMousePosition = () => {
        const [mousePosition, setMousePosition] = React.useState({
            x: null,
            y: null,
        });

        React.useEffect(() => {
            const updateMousePosition = (ev) => {
                setMousePosition({ x: ev.clientX, y: ev.clientY });
            };

            window.addEventListener('mousemove', updateMousePosition);

            return () => {
                window.removeEventListener('mousemove', updateMousePosition);
            };
        }, []);

        return mousePosition;
    };

    const mousePosition = useMousePosition();
    return (
        <>
            {clicked ? (
                <StyledLottie
                    animationData={cursorClick}
                    colors={colors}
                    hovered={hovered}
                    style={{
                        top: mousePosition.y,
                        left: mousePosition.x,
                        transform: `translateY(-28px) translateX(-28px) scale(${
                            hovered ? 1.4 : 1
                        })`,
                    }}
                />
            ) : (
                <StyledCursor
                    colors={colors}
                    hovered={hovered}
                    style={{
                        top: mousePosition.y,
                        left: mousePosition.x,
                        transform: `translateY(${
                            hovered ? '4px' : '-10px'
                        }) translateX(${hovered ? '4px' : '-10px'}) scale(${
                            hovered ? 1.4 : 1
                        })`,
                    }}
                />
            )}
        </>
    );
};

export default Cursor;
