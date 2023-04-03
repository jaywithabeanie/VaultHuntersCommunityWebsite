import React from 'react';
import '../css/components/Title.scss';

import PropTypes from 'prop-types';

import vault_rock from '../images/assets/the_vault/item/vault_rock.png';

// Define component
function Title(props) {

    const {
        icon_url, // Test
        title
    } = props;

    return (
        <div className="title-container">
            <div className='icon'>
                <img src={icon_url} />
            </div>
            <div className='title'>
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
