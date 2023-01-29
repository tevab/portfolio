import React from 'react';
import PropTypes from 'prop-types';

const MainContainer = (props) => {
    return (
        <div className={props.className} id='main'>
            {props.children}
        </div>
    );
};

MainContainer.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
};

export default MainContainer;
