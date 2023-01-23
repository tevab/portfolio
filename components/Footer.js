import React from 'react';

const Footer = (props) => {
    return (
        <div className={props.className}>
            &copy; Teva Barzilay {new Date().getFullYear()} - check me out on{' '}
            <a
                href='https://github.com/tevab/portfolio'
                target='_blank'
                rel='noreferrer'
            >
                GitHub
            </a>
            !
        </div>
    );
};

export default Footer;
