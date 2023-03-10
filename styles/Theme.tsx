import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { insidePadding, outsidePadding, footerHeight } from './GlobalVariables';

interface WrapperProps {
    variant?: string;
    responsive?: string | null;
    currentWork?: string;
}

export const Wrapper = styled.div<WrapperProps>`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    ${(props) =>
        props.variant === 'full' &&
        css`
            display: block;
        `}
    ${(props) =>
        props.variant === 'flex' &&
        css`
            display: flex;
            overflow: hidden;
        `}
    ${(props) =>
        props.variant === 'work' &&
        css`
            position: relative;
            display: flex;
            overflow: hidden;
            height: ${props.responsive === 'isMobile' ? 'auto' : '100%'};
            flex-direction: ${props.responsive === 'isMobile'
                ? 'column'
                : 'row'};
        `}
`;

interface ColumnrProps {
    variant: string;
    responsive: string | null;
}

export const Column = styled.div<ColumnrProps>`
    padding: ${insidePadding}px;
    padding-top: ${insidePadding}px;
    overflow: auto;
    ${(props) =>
        props.variant === 'wide' &&
        css`
            width: 70%;
        `}
    ${(props) =>
        props.variant === 'narrow' &&
        css`
            width: 30%;
        `}
    ${(props) =>
        props.variant === 'wideWork' &&
        css`
            position: relative;
            width: ${props.responsive === 'isMobile' ? '100%' : '60vw'};
            padding: 0;
            height: ${props.responsive === 'isMobile'
                ? '380px'
                : `calc(100vh - ${outsidePadding}px - ${footerHeight}px - 2px)`};
            z-index: -1;
        `}
    ${(props) =>
        props.variant === 'narrowWork' &&
        css`
            width: ${props.responsive === 'isMobile' ? '100%' : '40vw'};
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: ${props.responsive === 'isMobile'
                ? `40px ${insidePadding / 4}px 0`
                : `0
                ${insidePadding}px 0 0;`};
            height: 100%;
        `}
        ${(props) =>
        props.variant === 'narrowAbout' &&
        css`
            padding: 0 0 90px 0;
            overflow: hidden;
        `}
`;

interface StyledInputProps {
    colors: {
        fonts: {
            text: string;
        };
        borders: string;
    };
}

export const StyledInput = styled.div<StyledInputProps>`
    display: block;
    margin-bottom: 10px;
    padding: 14px;
    width: 100%;
    border: 1px solid ${(props) => props.colors.borders};
    background-color: transparent;
    color: ${(props) => props.colors.fonts.text};
    &::placeholder {
        color: ${(props) => props.colors.fonts.text};
        fontfamily: 'Hind';
    }
`;
