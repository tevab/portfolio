import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './Layout';
import styled, { keyframes, css } from 'styled-components';
import { menuSpeed, Colors } from '@/styles/GlobalVariables';
import Navbar from './Navbar';

const bounce = keyframes`
  0% {
    width: 100px;
    height: 100px;
  }
  10% {
    width: 120px;
  }
  20% {
    width: 100px;
  }
  40% {
    width: 120px;
  }
  50% {
    width: 100px;
  }
  100% {
    width: 100px;
  }
`;

const StyledMenu = styled.div`
    background: ${(props) => props.colors.borders};
    height: 100px;
    width: 100px;
    transform: scale(${(props) => (props.openMenu ? 100 : 1)});
    cursor: pointer;
    transition: all ${menuSpeed}ms ease-in-out;
    ${(props) =>
        !props.menuOpened &&
        css`
            animation: ${bounce} infinite 2000ms ease;
        `}
`;

const Menu = () => {
    const { openMenu, setOpenMenu } = useContext(AppContext);
    const [menuOpened, setMenuOpened] = useState(false);

    const colors = useContext(Colors);

    useEffect(() => {
        if (openMenu) {
            setMenuOpened(true);
        }
    }, [openMenu]);

    return (
        <>
            <div
                style={{
                    transform: 'rotate(45deg)',
                    position: 'absolute',
                    top: '-52px',
                    right: '-52px',
                }}
            >
                <StyledMenu
                    onClick={() => setOpenMenu(!openMenu)}
                    openMenu={openMenu}
                    colors={colors}
                    menuOpened={menuOpened}
                />
            </div>
            <Navbar openMenu={openMenu} />
        </>
    );
};

export default Menu;
