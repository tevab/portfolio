import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './Layout';
import { keyframes, css } from '@emotion/react';
import styled from '@emotion/styled';
import { menuSpeed, Colors } from '@/styles/GlobalVariables';
import Navbar from './Navbar';

const bounce = keyframes`
  0% {
    width: 200px;
    height: 200px;
  }
  10% {
    width: 220px;
  }
  20% {
    width: 200px;
  }
  40% {
    width: 220px;
  }
  50% {
    width: 200px;
  }
  100% {
    width: 200px;
  }
`;

const StyledMenu = styled.div`
    background: ${(props) => props.colors.borders};
    height: 200px;
    width: 200px;
    transform: scale(${(props) => (props.openMenu ? 100 : 1)});
    cursor: pointer;
    transition: all ${menuSpeed}ms ease-in-out;
    cursor: none;
    ${(props) =>
        !props.menuOpened &&
        css`
            animation: ${bounce} infinite 2000ms ease;
        `}
`;

const Menu = () => {
    const { openMenu, setOpenMenu, handleHover, handleHoverOut } =
        useContext(AppContext);
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
                    top: '-140px',
                    left: '-140px',
                }}
                onMouseOver={handleHover}
                onMouseOut={handleHoverOut}
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
