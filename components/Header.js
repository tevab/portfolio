import React, { useContext, useEffect, useState } from 'react';
import Menu from './Menu';
import styled from 'styled-components';
import Link from 'next/link';
import { AppContext } from './Layout';
import { menuSpeed } from '@/styles/GlobalVariables';

const Logo = styled(Link)`
    mix-blend-mode: difference;
    margin-top: 0;
    margin-bottom: 0;
    display: inline;
    color: #fff;
    text-decoration: none;
`;

const Title = styled.h1`
    font-size: 20px;
    max-width: ${(props) => (props.showTitle ? '99999px' : 0)};
    width: ${(props) => (props.showTitle ? 'auto' : 0)};
    display: inline-block;
    transition: max-width ${menuSpeed * 2}ms ease-in-out;
    height: 5px;
    opacity: ${(props) => (props.showTitle ? 1 : 0)};
`;

const Header = (props) => {
    const { setOpenMenu, page } = useContext(AppContext);
    const [title, setTitle] = useState('');
    const [showTitle, setShowtitle] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            if (page === 'about') {
                setTitle(' / About Me');
            } else if (page === 'work') {
                setTitle(' / My Work');
            } else if (page === 'resume') {
                setTitle(' / R');
            } else {
                setTitle('');
            }
        }, menuSpeed);

        console.log(title.length > 0);

        if (title.length === 0) {
            setShowtitle(false);
        } else {
            setShowtitle(false);
            setTimeout(() => {
                setShowtitle(true);
            }, menuSpeed);
        }
    }, [page, title]);

    return (
        <div className={props.className}>
            <Menu />
            <Logo href='/' onClick={() => setOpenMenu(false)}>
                Teva Barzilay{' '}
                <Title showTitle={showTitle}>
                    <span style={{ whiteSpace: 'nowrap' }}>{title}</span>
                </Title>
            </Logo>
        </div>
    );
};

export default Header;
