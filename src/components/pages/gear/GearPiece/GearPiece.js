import React from 'react';
import './GearPiece.scss';

// Components
import IconDisplayMedium from '../../../icon-display/medium/IconDisplayMedium';


function GearPiece(props) {

    const {
        isOddChild
    } = props

    const imageURL = require(`../../../../images/assets/the_vault/item/gear/${props.name}.png`);

    return (
        <div className='gear-piece'>
            <IconDisplayMedium variant = {props.isOddChild === true ? '1a' : '1b'}>
                <img src={imageURL} key={props.name} />
            </IconDisplayMedium>
        </div>
    );

}

export default GearPiece;
