import React from 'react';

interface MainContainerProps {
    className?: string;
    children: React.ReactNode;
}

const MainContainer = (props: MainContainerProps) => {
    return (
        <div className={props.className} id='main'>
            {props.children}
        </div>
    );
};

export default MainContainer;
