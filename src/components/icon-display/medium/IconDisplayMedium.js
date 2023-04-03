import React from 'react';
import './IconDisplayMedium.scss';


import icon_variant_1a from '../../../images/assets/breadcrumb/icon_small_variant1_a.png';
import icon_variant_1b from '../../../images/assets/breadcrumb/icon_small_variant1_b.png';

function IconDisplayMedium(props) {

    const {
      variant
    } = props

    // Retrieve URL based on icon variant
    function getIconVariantURL() {
        switch (variant) {
            case "1a": return icon_variant_1a;
            case "1b": return icon_variant_1b;
            default: return '';
        }
    } 

    return (
        <div href='' className="icon-display-medium">
            <img src={getIconVariantURL()} className="background" />
            {props.children}
        </div>
    );

}

export default IconDisplayMedium;
