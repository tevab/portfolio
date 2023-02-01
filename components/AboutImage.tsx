import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import usePrevious from '../hooks/usePrevious';
import { keyframes } from '@emotion/react';
import { menuSpeed } from '../styles/GlobalVariables';

interface AboutImageProps {
    background?: 'default' | 'ireland' | 'jungle' | 'rocky';
}

const swipe = keyframes`
  from {
    left: 0px;
  }
  to {
    left: -320px;
  }
`;

const hatSwipeIn = keyframes`
    0% {
        opacity: 0
    }
    60% {
        opacity: 0;
    }
    100%{
        opacity: 100;
    }
`;

const hatSwipeOut = keyframes`
    0% {
        opacity: 100;
    }
    20% {
        opacity: 100;
    }
    40%{
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
`;

const ImageBackground = styled.div({
    height: '440px',
    width: '320px',
    marginTop: 100,
    position: 'relative',
});

const SlidingContainer = styled.div(
    (props: { swipe: boolean; variant?: string }) => ({
        position: 'absolute',
        width: '640px',
        zIndex: 0,
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        left: 0,
        animation: props.swipe ? `${swipe}` : 'none',
        animationIterationCount: 1,
        animationDuration: `${menuSpeed}ms`,
        ...(props.variant === 'hat' && { zIndex: 2 }),
    })
);

const Hat = styled.div(
    (props: {
        variant: string;
        background?: string;
        prevBackground?: string | null;
        swipe: boolean;
    }) => ({
        position: 'absolute',
        width: `${
            props.background === 'ireland' || props.prevBackground === 'ireland'
                ? '204px'
                : props.background === 'jungle' ||
                  props.prevBackground === 'jungle'
                ? '200px'
                : props.background === 'rocky' ||
                  props.prevBackground === 'rocky'
                ? '266px'
                : null
        }`,
        height: `${
            props.background === 'ireland' || props.prevBackground === 'ireland'
                ? '190px'
                : props.background === 'jungle' ||
                  props.prevBackground === 'jungle'
                ? '160px'
                : props.background === 'rocky' ||
                  props.prevBackground === 'rocky'
                ? '230px'
                : null
        }`,
        display: `${
            props.background === 'default' || props.prevBackground === 'default'
                ? 'none'
                : 'block'
        }`,
        backgroundSize: 'contain',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        ...(props.variant === 'in' && {
            top: `${
                props.background === 'ireland'
                    ? '-79px'
                    : props.background === 'jungle'
                    ? '-34px'
                    : props.background === 'rocky'
                    ? '-49px'
                    : null
            }`,
            left: `${
                props.background === 'ireland'
                    ? '93px'
                    : props.background === 'jungle'
                    ? '75px'
                    : props.background === 'rocky'
                    ? '25px'
                    : null
            }`,
            backgroundImage: `url(${
                props.background === 'ireland'
                    ? './webp/ireland-hat.webp'
                    : props.background === 'jungle'
                    ? './webp/jungle-hat.webp'
                    : props.background === 'rocky'
                    ? './webp/rocky-wig.webp'
                    : null
            })`,
            animation: props.swipe ? `${hatSwipeOut}` : 'none',
            animationIterationCount: '1',
            animationDuration: `${menuSpeed}ms`,
        }),

        ...(props.variant === 'out' && {
            top: `${
                props.prevBackground === 'ireland'
                    ? '-79px'
                    : props.prevBackground === 'jungle'
                    ? '-34px'
                    : props.prevBackground === 'rocky'
                    ? '-49px'
                    : null
            }`,
            right: `${
                props.prevBackground === 'ireland'
                    ? '22px'
                    : props.prevBackground === 'jungle'
                    ? '45px'
                    : props.prevBackground === 'rocky'
                    ? '28px'
                    : null
            }`,
            backgroundImage: `url(${
                props.prevBackground === 'ireland'
                    ? './webp/ireland-hat.webp'
                    : props.prevBackground === 'jungle'
                    ? './webp/jungle-hat.webp'
                    : props.prevBackground === 'rocky'
                    ? './webp/rocky-wig.webp'
                    : null
            })`,
            display: props.swipe ? 'block' : 'none',
            animation: props.swipe ? `${hatSwipeIn}` : 'none',
            animationIterationCount: '1',
            animationDuration: `${menuSpeed}ms`,
        }),
    })
);

const ReplacingBackground = styled.div(
    (props: {
        variant: string;
        background?: string;
        prevBackground?: string | null;
    }) => ({
        width: '320px',
        ...(props.variant === 'in' && {
            backgroundImage: `url(${
                props.background === 'ireland'
                    ? './webp/ireland-bg.webp'
                    : props.background === 'jungle'
                    ? './webp/jungle-bg.webp'
                    : props.background === 'rocky'
                    ? './webp/rocky-bg.webp'
                    : './webp/teva-bg.webp'
            })`,
        }),
        ...(props.variant === 'out' && {
            backgroundImage: `url(${
                props.prevBackground === 'ireland'
                    ? './webp/ireland-bg.webp'
                    : props.prevBackground === 'jungle'
                    ? './webp/jungle-bg.webp'
                    : props.prevBackground === 'rocky'
                    ? './webp/rocky-bg.webp'
                    : './webp/teva-bg.webp'
            })`,
        }),
    })
);

const Teva = styled.div({
    width: '100%',
    height: '100%',
    backgroundImage: 'url(./webp/teva.webp)',
    backgroundSize: 'contain',
    backgroundPosition: 'bottom right',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    zIndex: 1,
});

const AboutImage: React.FC<AboutImageProps> = ({ background }) => {
    const [localBackground, setLocalBackground] = useState(background);
    const [swipe, setSwipe] = useState(false);
    const prevBackground = usePrevious(localBackground);

    useEffect(() => {
        setLocalBackground(background);
        setSwipe(true);
        setTimeout(() => {
            setSwipe(false);
        }, menuSpeed);
    }, [background]);

    return (
        <ImageBackground>
            <SlidingContainer variant='hat' swipe={swipe}>
                <Hat variant='in' background={prevBackground} swipe={swipe} />
                <Hat
                    variant='out'
                    prevBackground={localBackground}
                    swipe={swipe}
                />
            </SlidingContainer>
            <Teva />
            <div
                style={{
                    overflow: 'hidden',
                    width: '320px',
                    height: '100%',
                    position: 'relative',
                }}
            >
                <SlidingContainer swipe={swipe}>
                    <ReplacingBackground
                        variant='in'
                        background={prevBackground}
                        style={{
                            backgroundSize: 'cover',
                            backgroundPosition: 'top',
                        }}
                    />
                    <ReplacingBackground
                        variant='out'
                        prevBackground={localBackground}
                        style={{
                            backgroundSize: 'cover',
                            backgroundPosition: 'top',
                        }}
                    />
                </SlidingContainer>
            </div>
        </ImageBackground>
    );
};

export default AboutImage;
