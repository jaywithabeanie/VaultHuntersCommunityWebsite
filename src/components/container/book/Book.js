// Dependencies
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import parse from 'html-react-parser';

// Stylesheets
import './Book.scss';

// Components
import BookItemDisplay from './BookItemDisplay/BookItemDisplay';
import BookCraftDisplay from './BookCraftDisplay/BookCraftDisplay';
import Title from '../../Title';

// Images
import book_background from '../../../images/assets/breadcrumb/book/background.png';
import title_icon_background from '../../../images/assets/breadcrumb/book/title_icon_background.png';
import title_icon_background_selected from '../../../images/assets/breadcrumb/book/title_icon_background_selected.png';
import title_label_background from '../../../images/assets/breadcrumb/book/title_label_background.png';
import arrow_back from '../../../images/assets/breadcrumb/book/arrow_back.png';


/**
 * Retrieves the Book component.
 * 
 * The Book component contains the following elements
 * - Book Title
 * 
 * @since 1.0.0
 * 
 * @return {HTMLElement} HTML Element.
 */
function Book (props) {

    // Initiate variables
    var {
        title_icon,
        title_label,
        content_links,
        currentPage,
        images
    } = props

    const [currentTab, setCurrentTab] = useState(0);

    const renderElement = (node, index) => {
        if (node.name === 'bookitemdisplay') {
          return <BookItemDisplay key={index} {...node.attribs} images={images} />;
        }
        if (node.name === 'bookcraftdisplay') {
            const ingredients = node.attribs.ingredients
              ? node.attribs.ingredients.split(',')
              : [];

            const ingredientsDictionary = {};
        
            for (let i = 0; i < 9; i++) {
                const ingredient = ingredients[i].trim();
        
                if (ingredient === '') {
                    ingredientsDictionary[i] = { name: '', quality: '' };
                } else if (ingredient.includes(':')) {
                    const [name, quality] = ingredient.split(':').map((s) => s.trim());
                    ingredientsDictionary[i] = { name, quality };
                } else {
                    ingredientsDictionary[i] = { name: ingredient, quality: '' };
                }
            }

            return <BookCraftDisplay key={index} {...node.attribs} ingredients={ingredientsDictionary} images={images}/>;
        }
        return null;
    };

    // Return component
    return (
        <div className='container-book background-parent'>
            <img src={book_background} className='background'/>
            { currentPage !== undefined &&
                <Link to="/guides" onClick={() => window.scrollTo(0, 0)} className='arrow-back'>
                    <img src={arrow_back}/>
                </Link>
            }
            <div className='content'>

                {currentPage !== undefined &&
                    <>
                        {currentPage.pages[currentTab].text.map((page, index) => (
                            <div className={`page-${index + 1}`}>
                                { index === 0 && (
                                    <>
                                        <div className='link-0'>
                                            <div to='#' className='background-parent'>
                                                <img src={title_icon_background} className='background' />
                                                <img src={images[currentPage.icon]} className='icon'/>
                                            </div>
                                            <div className='label background-parent'>
                                                <img src={title_label_background} className='background' />
                                                <p>{currentPage.title}</p>
                                            </div>
                                            <img src={title_icon} className='icon' />
                                        </div>
                                        <div className='tabs'>
                                            {currentPage.pages.map((tab, tabIndex) => (
                                                <div className='tab'>
                                                    <a className='background-parent' onClick={() => {setCurrentTab(tabIndex)}}>
                                                        <img src={currentTab === tabIndex ? title_icon_background_selected : title_icon_background} className='background' />
                                                        <img src={images[tab.icon]} className='icon'/>
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                                <div className='text'>
                                    {parse(page, { replace : renderElement })}
                                </div>
                            </div>
                        ))}
                    </>
                }

                {currentPage === undefined &&
                    <div className='page-1'>
                        {
                            content_links !== undefined && 
                            currentPage === undefined &&
                            content_links.map((link, index) => (
                                <div className={`link-${index + 1}`} key={index}>
                                    <Link to={link.url} onClick={() => {window.scrollTo(0, 0); props.onLinkClick(link.url); setCurrentTab(0);}} className="background-parent">
                                            <img src={title_icon_background} className='background'/>
                                            <img src={images[link.icon]} className='icon'/>
                                    </Link>
                                    <div className='label background-parent'>
                                        <img src={title_label_background} className='background' />
                                        <p>{link.title}</p>
                                    </div>
                                </div>
                            ))
                        }
                        {props.children}
                    </div>
                }
                {/* <div className='page-2'>

                </div> */}
            </div>
        </div>
    );

}


// Export component
export default Book;
