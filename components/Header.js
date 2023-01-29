import React, { useContext, useEffect, useState } from 'react';
import Menu from './Menu';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { AppContext } from './Layout';
import { menuSpeed, Colors } from '@/styles/GlobalVariables';

const Logo = styled(Link)`
    mix-blend-mode: difference;
    margin-top: 0;
    margin-bottom: 0;
    display: inline-block;
    color: ${(props) => props.colors.fonts.text};
    text-decoration: none;
    letter-spacing: -0.6px;
`;

const Title = styled.h1`
    font-size: 20px;
    display: inline-block;
    width: ${(props) =>
        props.fadeOut
            ? 0
            : props.page === 'work'
            ? '102px'
            : props.page === 'about'
            ? '110px'
            : props.page === 'resume'
            ? '98px'
            : 0};
    opacity: ${(props) => (props.fadeOut ? 0 : 1)};
    transition: all ${menuSpeed / 4}ms ease-in-out;
    letter-spacing: 0;
    margin: 0;
`;

const StyledSpan = styled.span`
    overflow: hidden;
    display: inline-block;
    height: 30px;
    transition: all ${menuSpeed / 4}ms ease-in-out;
    ${(props) =>
        props.variant === 'first' &&
        css`
            width: ${props.responsive === 'isMobile' && props.page !== 'home'
                ? 0
                : '42px'};
            margin-right: ${props.responsive === 'isMobile' &&
            props.page !== 'home'
                ? 0
                : '6px'};
            opacity: ${props.responsive === 'isMobile' && props.page !== 'home'
                ? 0
                : 1};
        `}
    ${(props) =>
        props.variant === 'last' &&
        css`
            width: ${props.responsive === 'isMobile' && props.page !== 'home'
                ? 0
                : '84px'};
            margin-right: 0;
        `}
    ${(props) =>
        props.variant === 'title' &&
        css`
            width: inherit;
        `}
`;

const Header = (props) => {
    const { setOpenMenu, page, responsive, handleHover, handleHoverOut } =
        useContext(AppContext);
    const [title, setTitle] = useState('');
    const [fadeOut, setFadeOut] = useState(false);

    const colors = useContext(Colors);

    useEffect(() => {
        setFadeOut(true);
        setTimeout(() => {
            if (page === 'about') {
                setTitle('/ About Me');
            } else if (page === 'work') {
                setTitle('/ My Work');
            } else if (page === 'resume') {
                setTitle('/ Resume');
            } else {
                setTitle('');
            }
            setTimeout(() => {
                setFadeOut(false);
            }, 400);
        }, menuSpeed);
    }, [page]);

    return (
        <div className={props.className}>
            <Menu />
            <Logo
                href='/'
                onClick={() => setOpenMenu(false)}
                colors={colors}
                onMouseOver={handleHover}
                onMouseOut={handleHoverOut}
            >
                <StyledSpan>T</StyledSpan>
                <StyledSpan variant='first' responsive={responsive} page={page}>
                    eva{' '}
                </StyledSpan>
                <StyledSpan>B</StyledSpan>
                <StyledSpan variant='last' responsive={responsive} page={page}>
                    arzilay
                </StyledSpan>
                <StyledSpan variant='title' responsive={responsive}>
                    <Title page={page} fadeOut={fadeOut}>
                        <span style={{ whiteSpace: 'nowrap' }}>{title}</span>
                    </Title>
                </StyledSpan>
            </Logo>
        </div>
    );
};

export default Header;
