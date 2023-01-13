import React from 'react';

const Footer = (props) => {
    return (
        <div className={props.className}>
            &copy; Teva Barzilay {new Date().getFullYear()}
        </div>
    );
};

export default Footer;
