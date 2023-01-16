import styled from 'styled-components';
import { variant } from 'styled-system';
import {
    insidePadding,
    outsidePadding,
    headerHeight,
    footerHeight,
    hoverSpeed,
} from './GlobalVariables';

export const Wrapper = styled('div')(
    {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    variant({
        variants: {
            full: {
                display: 'block',
            },
            flex: {
                display: 'flex',
                overflow: 'hidden',
            },
            work: {
                position: 'relative',
                display: 'flex',
                overflow: 'hidden',
                height: '100%',
            },
        },
    })
);

export const Column = styled('div')(
    {
        padding: insidePadding,
        paddingTop: headerHeight + insidePadding,
        overflow: 'auto',
    },
    variant({
        variants: {
            wide: {
                width: '70%',
            },
            narrow: {
                width: '30%',
            },
            wideWork: {
                width: '66%',
                padding: 0,
                height: `calc(100vh - ${outsidePadding}px - ${footerHeight}px - 2px)`,
            },
            narrowWork: {
                width: '30%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: insidePadding,
            },
        },
    })
);

const InputStyle = {
    display: 'block',
    marginBottom: 10,
    padding: 14,
    width: '100%',
    border: '1px solid white',
    backgroundColor: 'transparent',
    color: 'white',
    '&::placeholder': {
        color: 'white',
        fontFamily: 'Maven Pro',
    },
};

export const TextField = styled.input(InputStyle);

export const StyledTextArea = styled.textarea(InputStyle);

export const StyledButton = styled.button`
    padding: 14px;
    border: none;
    background-color: rgba(0, 0, 0, 0.2);
    color: white;
    transition: all ${hoverSpeed}ms ease-in-out;
    cursor: pointer;
    &:hover {
        background-color: rgba(0, 0, 0, 0.4);
    }
`;
