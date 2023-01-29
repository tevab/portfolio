import * as React from 'react';

const CursorImage = (props) => (
    <svg
        width={97}
        height={97}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
    >
        <circle cx={10} cy={10} r={10} fill={props.colors.black} />
    </svg>
);

export default CursorImage;
