import styled from 'styled-components';
import { variant } from 'styled-system';

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
            },
        },
    })
);

export const Column = styled('div')(
    variant({
        variants: {
            wide: {
                width: '70%',
            },
            narrow: {
                width: '30%',
            },
        },
    })
);

export const TextField = styled.input``;

export const StyledTextArea = styled.textarea``;

export const StyledButton = styled.button``;
