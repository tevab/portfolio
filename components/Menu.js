import React, { useContext } from 'react';
import { AppContext } from './Layout';
import styled from 'styled-components';
import { menuSpeed } from '@/styles/GlobalVariables';
import Navbar from './Navbar';

const StyledMenu = styled.div`
    background: #fff;
    height: 100px;
    width: 100px;
    transform: scale(${(props) => (props.openMenu ? 100 : 1)});
    cursor: pointer;
    transition: all ${menuSpeed}ms ease-in-out;
`;

const Menu = () => {
    const { openMenu, setOpenMenu } = useContext(AppContext);

    return (
        <>
            <div
                style={{
                    transform: 'rotate(45deg)',
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                }}
            >
                <StyledMenu
                    onClick={() => setOpenMenu(!openMenu)}
                    openMenu={openMenu}
                />
            </div>
            <Navbar openMenu={openMenu} />
        </>
    );
};

export default Menu;
