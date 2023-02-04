import React, { useEffect, useContext } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { menuSpeed } from '../styles/GlobalVariables';
import { AboutContext } from '../pages/about';

interface AboutContextType {
    localBackground: string;
    setLocalBackground: React.Dispatch<React.SetStateAction<string>>;
    swipe: boolean;
    setSwipe: React.Dispatch<React.SetStateAction<boolean>>;
    prevBackground: string;
    setPrevBackroud: React.Dispatch<React.SetStateAction<string>>;
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
        left: -320,
        animation: props.swipe ? `${swipe}` : 'none',
        animationIterationCount: 1,
        animationDuration: `${menuSpeed}ms`,
        ...(props.variant === 'hat' && { zIndex: 2, left: 0 }),
    })
);

const Hat = styled.div(
    (props: {
        variant: string;
        localBackground?: string;
        prevBackground?: string | null;
        swipe: boolean;
    }) => ({
        position: 'absolute',
        width: `${
            props.localBackground === 'ireland' ||
            props.prevBackground === 'ireland'
                ? '204px'
                : props.localBackground === 'jungle' ||
                  props.prevBackground === 'jungle'
                ? '200px'
                : props.localBackground === 'rocky' ||
                  props.prevBackground === 'rocky'
                ? '266px'
                : null
        }`,
        height: `${
            props.localBackground === 'ireland' ||
            props.prevBackground === 'ireland'
                ? '190px'
                : props.localBackground === 'jungle' ||
                  props.prevBackground === 'jungle'
                ? '160px'
                : props.localBackground === 'rocky' ||
                  props.prevBackground === 'rocky'
                ? '230px'
                : null
        }`,
        display: `${
            props.localBackground === 'default' ||
            props.prevBackground === 'default'
                ? 'none'
                : 'block'
        }`,
        backgroundSize: 'contain',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        ...(props.variant === 'in' && {
            top: `${
                props.prevBackground === 'ireland'
                    ? '-79px'
                    : props.prevBackground === 'jungle'
                    ? '-34px'
                    : props.prevBackground === 'rocky'
                    ? '-49px'
                    : null
            }`,
            left: `${
                props.prevBackground === 'ireland'
                    ? '93px'
                    : props.prevBackground === 'jungle'
                    ? '75px'
                    : props.prevBackground === 'rocky'
                    ? '25px'
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
            animation: props.swipe ? `${hatSwipeOut}` : 'none',
            animationIterationCount: '1',
            animationDuration: `${menuSpeed}ms`,
        }),

        ...(props.variant === 'out' && {
            top: `${
                props.localBackground === 'ireland'
                    ? '-79px'
                    : props.localBackground === 'jungle'
                    ? '-34px'
                    : props.localBackground === 'rocky'
                    ? '-49px'
                    : null
            }`,
            right: `${
                props.localBackground === 'ireland'
                    ? '22px'
                    : props.localBackground === 'jungle'
                    ? '45px'
                    : props.localBackground === 'rocky'
                    ? '28px'
                    : null
            }`,
            backgroundImage: `url(${
                props.localBackground === 'ireland'
                    ? './webp/ireland-hat.webp'
                    : props.localBackground === 'jungle'
                    ? './webp/jungle-hat.webp'
                    : props.localBackground === 'rocky'
                    ? './webp/rocky-wig.webp'
                    : null
            })`,
            animation: props.swipe ? `${hatSwipeIn}` : 'none',
            animationIterationCount: '1',
            animationDuration: `${menuSpeed}ms`,
        }),
    })
);

const ReplacingBackground = styled.div(
    (props: {
        variant: string;
        localBackground?: string;
        prevBackground?: string | null;
    }) => ({
        width: '320px',
        ...(props.variant === 'in' && {
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
        ...(props.variant === 'out' && {
            backgroundImage: `url(${
                props.localBackground === 'ireland'
                    ? './webp/ireland-bg.webp'
                    : props.localBackground === 'jungle'
                    ? './webp/jungle-bg.webp'
                    : props.localBackground === 'rocky'
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

const AboutImage = () => {
    const context = useContext(AboutContext);
    if (context === null) return null;
    const { localBackground, swipe, setSwipe, prevBackground } =
        context as AboutContextType;

    useEffect(() => {
        setSwipe(true);
        setTimeout(() => {
            setSwipe(false);
        }, menuSpeed);
    }, [localBackground]);

    return (
        <ImageBackground>
            <SlidingContainer variant='hat' swipe={swipe}>
                <Hat
                    variant='in'
                    prevBackground={prevBackground}
                    swipe={swipe}
                />
                <Hat
                    variant='out'
                    localBackground={localBackground}
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
                        prevBackground={prevBackground}
                        style={{
                            backgroundSize: 'cover',
                            backgroundPosition: 'top',
                        }}
                    />
                    <ReplacingBackground
                        variant='out'
                        localBackground={localBackground}
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
