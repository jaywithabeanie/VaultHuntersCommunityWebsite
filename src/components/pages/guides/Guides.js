// Dependencies
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

// Stylesheets
import './Guides.scss';

// JSON
import langGuides from '../../../data/lang/guides.json';

// Components
import Book from '../../container/book/Book';
import Title from '../../Title';

// Images
import image_book from '../../../images/assets/minecraft/item/book.png';



function importAll(r) {
  let images = {};
  r.keys().forEach((path) => {
    const imageName = path.replace(/^.*[\\/]/, '');
    images[imageName] = r(path);
  });
  return images;
}

const images = importAll(require.context('/images/guides', false, /\.(png|jpe?g|svg)$/));


/**
 * Retrieves the Guides component.
 * 
 * The Guides component contains the following elements
 * - ...
 * 
 * @since 1.0.0
 * 
 * @return {HTMLElement} HTML Element.
 */
function Guides (props) {

    // Initiate props
    const {
        currentPage,
        setCurrentPage
    } = props

    // Initiate variables
    const {guideId} = useParams();
    const guides = langGuides.guides;
  
    // Update Guide ID
    useEffect(() => {
      if (guideId) {
        setCurrentPage(guideId);
      } else {
        setCurrentPage(undefined);
      }
    }, [guideId, setCurrentPage]);

    const handleLinkClick = (guideURL) => {
      setCurrentPage(guideURL);
    };

    // Return component
    return (
        <>
            <Title icon={image_book} title='Guides' />
            {currentPage === undefined
                ?   <Book
                        content_links = {guides}
                        onLinkClick={handleLinkClick}
                        images = {images}
                        >

                    </Book>
                :   <Book
                      content_links = {guides.filter(content_link => content_link.url === currentPage)}
                      currentPage = {guides.filter(content_link => content_link.url === currentPage)[0]}
                      onLinkClick={handleLinkClick}
                      images = {images}
                      >

                    </Book>
            }

            
        </>
    );

}


// Export component
export default Guides;
