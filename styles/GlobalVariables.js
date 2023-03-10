import { createContext } from 'react';

export const outsidePadding = 30;
export const borderWidth = 6;
export const headerHeight = 60;
export const insidePadding = outsidePadding + headerHeight;
export const footerHeight = 40;
export const menuSpeed = 2000;
export const hoverSpeed = 400;

export const Colors = createContext({
    fonts: { text: '#ffffff', nav: '#255f85' },
    backgrounds: {
        home: '#C5283D',
        work: '#29B2BA',
        about: '#8BC528',
        resume: '#6228C5',
    },
    borders: '#ffffff',
    black: '#000000',
});
