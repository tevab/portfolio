import React, { useContext } from 'react';
import { AppContext } from './Layout';

const Footer = (props) => {
    const { handleHover, handleHoverOut } = useContext(AppContext);
    return (
        <div className={props.className}>
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
