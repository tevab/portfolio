import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './Layout';
import styled from '@emotion/styled';
import {
    menuSpeed,
    insidePadding,
    outsidePadding,
    footerHeight,
    Colors,
} from '@/styles/GlobalVariables';
import CloseIcon from '../public/svg/CloseIcon';
import Link from 'next/link';

const StyledNavbar = styled.ul`
    position: absolute;
    visibility: ${(props) => (props.hideNav ? 'hidden' : 'visible')};
    opacity: ${(props) => (props.openMenu ? 1 : 0)};
    transition: opacity ${menuSpeed / 2}ms ease-in-out, visiblity 0ms linear;
    transition-delay: ${(props) => (props.openMenu ? `${menuSpeed / 2}` : 0)}ms;
    margin: -${insidePadding}px;
    width: 100%;
    height: calc(100vh - ${outsidePadding}px - ${footerHeight}px);
    display: flex;
    flex-direction: ${(props) =>
        props.responsive === 'isMobile' ? 'column' : 'row'};
    align-content: center;
    justify-content: center;
    align-items: center;
    list-style: none;
    padding: 0;
    font-size: 2vw;
    top: ${(props) =>
        props.responsive === 'isMobile'
            ? `${insidePadding - 40}px`
            : `${insidePadding}px`};
    left: ${insidePadding}px;
    font-family: 'Slabo';
`;

const StyledCloseIcon = styled(CloseIcon)`
    width: 40px;
    height: 40px;
    position: absolute;
    top: 10px;
    left: 10px;
    cursor: pointer;
    z-index: 1;
    visibility: ${(props) => (props.hideNav ? 'hidden' : 'visible')};
    opacity: ${(props) => (props.openMenu ? 1 : 0)};
    transition: opacity ${menuSpeed / 2}ms ease-in-out, visiblity 0ms linear;
    transition-delay: ${(props) => (props.openMenu ? `${menuSpeed / 2}` : 0)}ms;
    cursor: none;
`;

const NavLink = styled(Link)`
    font-family: 'Hind';
    text-decoration: none;
    color: ${(props) => props.colors.fonts.nav};
    display: block;
    margin: 0 20px;
    font-size: ${(props) => (props.responsive === 'isMobile' ? '16vw' : '4vw')};
    font-weight: 600;
    line-height: ${(props) =>
        props.responsive === 'isMobile' ? '20vw' : 'inherit'};
    position: relative;
    &::before {
        content: '';
        position: absolute;
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
        left: -5%;
        top: ${(props) => (props.responsive === 'isMobile' ? '0' : '-2vw')};
        height: ${(props) =>
            props.responsive === 'isMobile' ? '20vw' : '5vw'};
        width: 0%;
        mix-blend-mode: multiply;
        opacity: 0.4;
        transition: all ${menuSpeed / 4}ms ease-in-out;
    }
    &:hover {
        &::before {
            width: 110%;
        }
    }
`;

const Navbar = () => {
    const {
        openMenu,
        setOpenMenu,
        responsive,
        page,
        handleHover,
        handleHoverOut,
    } = useContext(AppContext);
    const [hideNav, setHideNav] = useState(true);

    const colors = useContext(Colors);

    useEffect(() => {
        if (!openMenu) {
            setTimeout(() => {
                setHideNav(true);
            }, menuSpeed);
        } else {
            setHideNav(false);
        }
    }, [openMenu]);

    return (
        <>
            <StyledCloseIcon
                onClick={() => setOpenMenu(false)}
                hideNav={hideNav}
                openMenu={openMenu}
                colors={colors}
                onMouseOver={handleHover}
                onMouseOut={handleHoverOut}
            />
            <StyledNavbar
                hideNav={hideNav}
                openMenu={openMenu}
                responsive={responsive}
            >
                <li>
                    <NavLink
                        href='/work'
                        onClick={() => setOpenMenu(false)}
                        colors={colors}
                        responsive={responsive}
                        page={page}
                        onMouseOver={handleHover}
                        onMouseOut={handleHoverOut}
                    >
                        Work
                    </NavLink>
                </li>
                {responsive === 'isDesktop' && (
                    <li style={{ color: colors.black }}>/</li>
                )}
                <li>
                    <NavLink
                        href='/about'
                        onClick={() => setOpenMenu(false)}
                        colors={colors}
                        responsive={responsive}
                        page={page}
                        onMouseOver={handleHover}
                        onMouseOut={handleHoverOut}
                    >
                        About
                    </NavLink>
                </li>
                {responsive === 'isDesktop' && (
                    <li style={{ color: colors.black }}>/</li>
                )}
                <li>
                    <NavLink
                        href='/resume'
                        onClick={() => setOpenMenu(false)}
                        colors={colors}
                        responsive={responsive}
                        page={page}
                        onMouseOver={handleHover}
                        onMouseOut={handleHoverOut}
                    >
                        Resume
                    </NavLink>
                </li>
            </StyledNavbar>
        </>
    );
};

export default Navbar;
