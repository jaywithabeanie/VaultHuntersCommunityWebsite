import React from 'react';
import './IconDisplaySmall.scss';


function GearPiece(props) {

    return (
        <a href=''>
            <div className="icon-display-small">
                {props.children}
            </div>
        </a>
    );

}

export default GearPiece;
