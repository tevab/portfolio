import React, { useContext, useEffect, useState } from 'react';
import Menu from './Menu';
import styled from 'styled-components';
import Link from 'next/link';
import { AppContext } from './Layout';
import { menuSpeed, Colors } from '@/styles/GlobalVariables';

const Logo = styled(Link)`
    mix-blend-mode: difference;
    margin-top: 0;
    margin-bottom: 0;
    display: inline;
    color: ${(props) => props.colors.fonts.text};
    text-decoration: none;
`;

const Title = styled.h1`
    font-size: 20px;
    display: inline-block;
    height: 5px;
    width: ${(props) =>
        props.fadeOut
            ? 0
            : props.page === 'work'
            ? '82px'
            : props.page === 'about'
            ? '85px'
            : props.page === 'resume'
            ? '72px'
            : 0};
    opacity: ${(props) => (props.fadeOut ? 0 : 1)};
    transition: all ${menuSpeed}ms ease-in-out;
`;

const Header = (props) => {
    const { setOpenMenu, page } = useContext(AppContext);
    const [title, setTitle] = useState('');
    const [fadeOut, setFadeOut] = useState(false);

    const colors = useContext(Colors);

    useEffect(() => {
        setFadeOut(true);
        setTimeout(() => {
            if (page === 'about') {
                setTitle(' / About Me');
            } else if (page === 'work') {
                setTitle(' / My Work');
            } else if (page === 'resume') {
                setTitle(' / Resume');
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
            <Logo href='/' onClick={() => setOpenMenu(false)} colors={colors}>
                Teva Barzilay{' '}
                <Title page={page} fadeOut={fadeOut}>
                    <span style={{ whiteSpace: 'nowrap' }}>{title}</span>
                </Title>
            </Logo>
        </div>
    );
};

export default Header;
