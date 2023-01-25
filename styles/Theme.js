import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
    insidePadding,
    outsidePadding,
    headerHeight,
    footerHeight,
} from './GlobalVariables';

export const Wrapper = styled.div`
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
            height: 100%;
            flex-direction: ${props.responsive === 'isMobile'
                ? 'column'
                : 'row'};
        `}
`;

export const Column = styled.div`
    padding: ${insidePadding}px;
    padding-top: ${headerHeight + insidePadding}px;
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
            width: 66%;
            padding: 0;
            height: calc(100vh - ${outsidePadding}px - ${footerHeight}px - 2px);
        `}
    ${(props) =>
        props.variant === 'narrowWork' &&
        css`
            width: 30%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: ${insidePadding}px;
        `}
`;

export const StyledInput = styled.div`
    display: block;
    margin-bottom: 10px;
    padding: 14px;
    width: 100%;
    border: 1px solid ${(props) => props.colors.borders};
    background-color: transparent;
    color: ${(props) => props.colors.fonts.text};
    &::placeholder {
        color: ${(props) => props.colors.fonts.text};
        fontFamily: 'Maven Pro;
    }
`;
