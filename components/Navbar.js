import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './Layout';
import styled from 'styled-components';
import {
    menuSpeed,
    insidePadding,
    outsidePadding,
    footerHeight,
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
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    list-style: none;
    padding: 0;
`;

const StyledCloseIcon = styled(CloseIcon)`
    width: 40px;
    height: 40px;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    z-index: 1;
    visibility: ${(props) => (props.hideNav ? 'hidden' : 'visible')};
    opacity: ${(props) => (props.openMenu ? 1 : 0)};
    transition: opacity ${menuSpeed / 2}ms ease-in-out, visiblity 0ms linear;
    transition-delay: ${(props) => (props.openMenu ? `${menuSpeed / 2}` : 0)}ms;
`;

const NavLink = styled(Link)`
    font-family: 'Maven Pro';
    text-decoration: none;
    font-size: 8vw;
    color: #255f85;
    display: block;
    margin: 20px 0;
`;

const Navbar = () => {
    const { openMenu, setOpenMenu } = useContext(AppContext);
    const [hideNav, setHideNav] = useState(true);

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
            />
            <StyledNavbar hideNav={hideNav} openMenu={openMenu}>
                <li>
                    <NavLink href='/work' onClick={() => setOpenMenu(false)}>
                        Work
                    </NavLink>
                </li>
                <li>
                    <NavLink href='/about' onClick={() => setOpenMenu(false)}>
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink href='/resume' onClick={() => setOpenMenu(false)}>
                        Resume
                    </NavLink>
                </li>
            </StyledNavbar>
        </>
    );
};

export default Navbar;
