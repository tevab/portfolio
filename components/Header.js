import React, { useContext } from 'react';
import Menu from './Menu';
import styled from 'styled-components';
import Link from 'next/link';
import { AppContext } from './Layout';

const Logo = styled(Link)`
    mix-blend-mode: difference;
    margin-top: 0;
    margin-bottom: 0;
    display: inline;
    color: #fff;
    text-decoration: none;
`;

const Header = (props) => {
    const { setOpenMenu } = useContext(AppContext);
    return (
        <div className={props.className}>
            <Menu />
            <Logo href='/' onClick={() => setOpenMenu(false)}>
                Teva Barzilay
            </Logo>
        </div>
    );
};

export default Header;
