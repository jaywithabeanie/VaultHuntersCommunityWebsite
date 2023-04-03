import React, {useState, useEffect}from 'react';
import './GearPiece.scss';

// Components
import IconDisplayMedium from '../../../icon-display/medium/IconDisplayMedium';

import gearPiece_helmet from '../../../../images/assets/the_vault/item/gear/helmet.png';
import gearPiece_chestplate from '../../../../images/assets/the_vault/item/gear/chestplate.png';
import gearPiece_leggings from '../../../../images/assets/the_vault/item/gear/leggings.png';
import gearPiece_boots from '../../../../images/assets/the_vault/item/gear/boots.png';
import gearPiece_sword from '../../../../images/assets/the_vault/item/gear/sword.png';
import gearPiece_axe from '../../../../images/assets/the_vault/item/gear/axe.png';
import gearPiece_idol from '../../../../images/assets/the_vault/item/gear/idol.png';
import gearPiece_shield from '../../../../images/assets/the_vault/item/gear/shield.png';
import gearPiece_magnet from '../../../../images/assets/the_vault/item/gear/magnet.png';


function GearPiece(props) {

    const {
        isOddChild
    } = props

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
