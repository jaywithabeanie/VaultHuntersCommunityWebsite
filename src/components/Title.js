import React from 'react';
import './Title.scss';

import PropTypes from 'prop-types';

/* Import images */
import vault_rock from '../images/assets/the_vault/item/vault_rock.png';
import title_icon_background from '../images/assets/breadcrumb/scroll_header_icon.png';
import title_label_background from '../images/assets/breadcrumb/scroll_header_label.png';

// Define component
function Title(props) {

    const {
        icon, // Test
        title
    } = props;

    return (
        <div className="title-container">
            <div className='icon background-parent'>
                <img src={title_icon_background} className='background' />
                <img src={icon} className='image'/>
            </div>
            <div className='title background-parent'>
                <img src={title_label_background} className='background' />
                <p>{title}</p>
            </div>
        </div>
    );

}

// Define prop types
Title.propTypes = {
    icon_url: PropTypes.string.isRequired, // the name of the user (required)
    title: PropTypes.string.isRequired, // the age of the user (optional)
};

// Export component
export default Title;
