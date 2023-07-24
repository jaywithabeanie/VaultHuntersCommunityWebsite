// Dependencies
import React from 'react';

// Stylesheets
import './BookCraftDisplay.scss';

// Components
import BookItemDisplay from '../BookItemDisplay/BookItemDisplay';

// Images
import crafting_grid from '../../../../images/assets/breadcrumb/book/crafting_grid.png';
import arrow_right from '../../../../images/assets/breadcrumb/book/arrow_right.png';


/**
 * Retrieves the BookCraftDisplay component.
 * 
 * The BookCraftDisplay component contains the following elements
 * - 
 * 
 * @since 1.0.0
 * 
 * @return {HTMLElement} HTML Element.
 */
function BookCraftDisplay (props) {

    // Initiate variables
    var {
        ingredients,
        result,
        images
    } = props

    // Return component
    return (
        <div className='book-craft-display'>
            <div className='ingredients background-parent'>
                <img src={crafting_grid} className='background'/>
                {Object.keys(ingredients).map((ingredient, index) => (
                    <BookItemDisplay key={index} icon={ingredients[ingredient].name} quality={ingredients[ingredient].quality} images={images} background={false}/>
                ))}
            </div>
            <img src={arrow_right} className='arrow-right'/>
            <BookItemDisplay icon={result.split(':')[0]} images={images} quality={result.split(':')[1] === undefined ? '' : result.split(':')[1]}/>
        </div>
    );

}


// Export component
export default BookCraftDisplay;
