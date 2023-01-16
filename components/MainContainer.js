import React from 'react';

const MainContainer = (props) => {
    return (
        <div className={props.className} id='main'>
            {props.children}
        </div>
    );
};

export default MainContainer;
