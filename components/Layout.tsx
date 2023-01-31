import Head from 'next/head';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import React, {
    createContext,
    useLayoutEffect,
    useState,
    useContext,
    useEffect,
} from 'react';
import {
    outsidePadding,
    insidePadding,
    borderWidth,
    headerHeight,
    footerHeight,
    menuSpeed,
    Colors,
} from '../styles/GlobalVariables';
import Footer from './Footer';
import Header from './Header';
import MainContainer from './MainContainer';
import Background from './Background';
import Cursor from './Cursor';
import { useRouter } from 'next/router';

interface IAppContext {
    openMenu: boolean;
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
    page: string;
    responsive: string | null;
    colors: {
        backgrounds: {
            home: string;
            work: string;
            about: string;
            resume: string;
        };
        fonts: {
            text: string;
        };
        borders: string;
    };
    clicked: boolean;
    setClicked: React.Dispatch<React.SetStateAction<boolean>>;
    handleHover: React.MouseEventHandler;
    handleHoverOut: React.MouseEventHandler;
    hovered: boolean;
}

export const AppContext = createContext<IAppContext | null>(null);

interface GlobalStyleProps {
    page: string;
    colors: {
        backgrounds: {
            home: string;
            work: string;
            about: string;
            resume: string;
        };
        fonts: {
            text: string;
        };
    };
}

const GlobalStyle = (props: GlobalStyleProps) => css`
    body {
        background-color: ${props.page === 'home'
            ? props.colors.backgrounds.home
            : props.page === 'work'
            ? props.colors.backgrounds.work
            : props.page === 'about'
            ? props.colors.backgrounds.about
            : props.page === 'resume'
            ? props.colors.backgrounds.resume
            : null};
        padding: 0;
        margin: 0;
        color: ${props.colors.fonts.text};
        font-family: 'Hind';
        font-weight: 300;
        transition: background-color ${menuSpeed}ms ease-in-out;
        font-size: 18px;
        overflow: hidden;
        line-height: 24px;
        cursor: none;
    }
    * {
        box-sizing: border-box;
    }
    p {
        margin: 0 0 40px 0;
    }
    a {
        color: inherit;
        cursor: none;
    }
`;

interface PageWrapperProps {
    responsive: string | null;
}

const PageWrapper = styled.div<PageWrapperProps>`
    width: 100%;
    height: ${(props) =>
        props.responsive === 'isMobile'
            ? 'calc(var(--vh, 1vh) * 100)'
            : '100vh'};
    padding: ${(props) =>
        props.responsive === 'isMobile'
            ? outsidePadding / 2
            : outsidePadding}px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
`;

interface PageBorderProps {
    responsive: string | null;
    colors: {
        borders: string;
    };
}

const PageBorder = styled.div<PageBorderProps>`
    border: ${(props) =>
            props.responsive === 'isMobile' ? borderWidth / 2 : borderWidth}px
        solid ${(props) => props.colors.borders};
    height: 100vh;
    position: relative;
    overflow: hidden;
`;

const StyledHeader = styled(Header)`
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    padding: ${insidePadding / 5}px;
    height: ${headerHeight}px;
    font-family: 'Slabo 27px';
    font-size: 32px;
    letter-spacing: -0.2px;
`;

const StyledMainContainer = styled(MainContainer)`
    overflow: auto;
    height: 100%;
    padding: ${insidePadding}px;
    padding-top: ${headerHeight}px;
    padding-bottom: ${footerHeight}px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
`;

interface StyledFooterProps {
    colors: {
        fonts: {
            text: string;
        };
    };
}

const StyledFooter = styled(Footer)<StyledFooterProps>`
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    padding: ${insidePadding / 3}px;
    height: ${footerHeight}px;
    font-size: 12px;
    color: ${(props) => props.colors.fonts.text};
`;

interface StyledBackgroundProps {
    responsive: string | null;
}

const StyledBackground = styled(Background)<StyledBackgroundProps>`
    list-style: none;
    padding: 0;
    z-index: -1;
    position: absolute;
    mix-blend-mode: multiply;
    opacity: 0.4;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: ${(props) =>
        props.responsive === 'isMobile'
            ? 'none'
            : 'translateY(-50vh) translateX(-50vw)'};
`;

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const [page, setPage] = useState('home');
    const [responsive, setResponsive] = useState<string | null>(null);
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);

    const colors = useContext(Colors);
    const router = useRouter();

    useLayoutEffect(() => {
        if (location.pathname === '/work') {
            setPage('work');
        } else if (location.pathname === '/about') {
            setPage('about');
        } else if (location.pathname === '/resume') {
            setPage('resume');
        } else {
            setPage('home');
        }
    }, [router.asPath]);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 990) {
                setResponsive('isMobile');
            } else if (window.innerWidth > 991) {
                setResponsive('isDesktop');
            }
            const vh = window.innerHeight * 0.01;
            const element = document.getElementById('page-wrapper');
            if (element) {
                element.style.setProperty('--vh', `${vh}px`);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseDown = () => {
        setClicked(true);
        setTimeout(() => {
            setClicked(false);
        }, menuSpeed);
    };

    const handleHover = () => {
        setHovered(true);
    };

    const handleHoverOut = () => {
        setHovered(false);
    };

    return (
        <>
            <AppContext.Provider
                value={{
                    openMenu,
                    setOpenMenu,
                    page,
                    responsive,
                    colors,
                    clicked,
                    setClicked,
                    handleHover,
                    handleHoverOut,
                    hovered,
                }}
            >
                <Global styles={() => GlobalStyle({ page, colors })} />
                <Cursor />
                <PageWrapper
                    id='page-wrapper'
                    responsive={responsive}
                    onMouseDown={handleMouseDown}
                >
                    <PageBorder colors={colors} responsive={responsive}>
                        <Head>
                            <title>Teva Barzilay</title>
                            <meta
                                name='description'
                                content='Generated by create next app'
                            />
                            <meta
                                name='viewport'
                                content='width=device-width, initial-scale=1'
                            />
                        </Head>
                        <StyledHeader />
                        <StyledMainContainer>{children}</StyledMainContainer>
                        <StyledFooter colors={colors} />
                    </PageBorder>
                    <StyledBackground responsive={responsive} />
                </PageWrapper>
            </AppContext.Provider>
        </>
    );
};

export default Layout;
