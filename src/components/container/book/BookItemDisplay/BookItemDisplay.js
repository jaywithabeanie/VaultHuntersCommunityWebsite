// Dependencies
import React from 'react';

// Stylesheets
import './BookItemDisplay.scss';

// Images
import title_icon_background from '../../../../images/assets/breadcrumb/book/item_display_background.png';


/**
 * Retrieves the BookItemDisplay component.
 * 
 * The BookItemDisplay component contains the following elements
 * - 
 * 
 * @since 1.0.0
 * 
 * @return {HTMLElement} HTML Element.
 */
function BookItemDisplay (props) {

    // Initiate variables
    var {
        icon,
        title,
        background,
        quality = '',
        images
    } = props

    // Return component
    return (
        <div className='book-item-display'>
            <div to='#' className={`icon background-parent ${quality}`}>
                { background !== false
                    ? <img src={title_icon_background} className='background' />
                    : ''
                }
                { images[icon] !== undefined
                    ? <img src={images[icon]} className={`icon ${quality}`}/>
                    : ''
                }
            </div>
            { title !== undefined
                ? <h3>{title}</h3>
                : ''
            }
            
        </div>
    );

}


// Export component
export default BookItemDisplay;
