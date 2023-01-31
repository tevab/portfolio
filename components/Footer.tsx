import React, { useContext } from 'react';
import { AppContext } from './Layout';

interface FooterProps {
    className?: string;
}

const Footer = ({ className }: FooterProps) => {
    const context = useContext(AppContext);
    if (!context) return null;

    const { handleHover, handleHoverOut } = context;

    return (
        <div className={className}>
            &copy; Teva Barzilay {new Date().getFullYear()} - check me out on{' '}
            <a
                href='https://github.com/tevab/portfolio'
                target='_blank'
                rel='noreferrer'
                onMouseOver={handleHover}
                onMouseOut={handleHoverOut}
            >
                GitHub
            </a>
            !
        </div>
    );
};

export default Footer;
