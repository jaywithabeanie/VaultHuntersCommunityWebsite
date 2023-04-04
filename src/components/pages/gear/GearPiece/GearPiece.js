import React, {useState, useEffect}from 'react';
import './GearPiece.scss';

// Components
import IconDisplayMedium from '../../../icon-display/medium/IconDisplayMedium';


function GearPiece(props) {

    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        async function loadImage() {
        const { default: src } = await import(`../../../../images/assets/the_vault/item/gear/${props.name}.png`);
        setImageSrc(src);
        }
        loadImage();
    }, [props.name]);

    return (
        <div className='gear-piece'>
            <IconDisplayMedium variant = {props.isOddChild === true ? '1a' : '1b'}>
                <img src={imageSrc} key={props.name} />
            </IconDisplayMedium>
        </div>
    );

}

export default GearPiece;
