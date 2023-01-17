import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';
import { createContext, useLayoutEffect, useState, useContext } from 'react';
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
import { useRouter } from 'next/router';

export const AppContext = createContext(null);

const GlobalStyle = createGlobalStyle`
    body {
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
        padding: 0;
        margin: 0;
        color: ${(props) => props.colors.fonts.text};
        font-family: 'Maven Pro';
        transition: background-color ${menuSpeed}ms ease-in-out;
        font-size: 18px;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
    * {
        box-sizing: border-box;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    p {
        margin: 0 0 40px 0
    }
`;

const PageWrapper = styled.div`
    width: 100%;
    height: 100vh;
    padding: ${outsidePadding}px;
    display: flex;
    flex-direction: column;
    position: relative;
`;

const PageBorder = styled.div`
    border: ${borderWidth}px solid ${(props) => props.colors.borders};
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
    padding: ${insidePadding}px;
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

const StyledFooter = styled(Footer)`
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    padding: ${insidePadding}px;
    height: ${footerHeight}px;
    font-size: 12px;
    color: ${(props) => props.colors.text};
`;

const Layout = ({ children }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const [page, setPage] = useState('home');

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

    return (
        <>
            <AppContext.Provider value={{ openMenu, setOpenMenu, page }}>
                <GlobalStyle page={page} colors={colors} />
                <PageWrapper>
                    <PageBorder colors={colors}>
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
                        <Background />
                    </PageBorder>
                </PageWrapper>
            </AppContext.Provider>
        </>
    );
};

export default Layout;
