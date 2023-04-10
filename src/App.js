// Dependencies
import React, {useState, useEffect, useRef} from 'react';
import {Routes, Route, useParams} from 'react-router-dom';
import {useLocation} from 'react-router-dom';

// Stylesheets
import './style.scss'

// Components
import Header from './components/Header';
import Footer from './components/Footer/Footer';

// Pages
import Home from './components/pages/Home';
import Gear from './components/pages/gear/Gear';
import Guides from './components/pages/guides/Guides';

// Images
import texturedBackgroundImage from './images/assets/the_vault/background_textured.png';
import untexturedBackgroundImage from './images/assets/the_vault/background_untextured_colorless.png';


/**
 * Retrieves the background image depending on the current page.
 * 
 * - When the website is on the homepage, the textured background image is used.
 * - When the website is on another page, the non-textured background image is used.
 * 
 * @since 1.0.0
 * 
 * @return {String} Background image.
 */
function useBackgroundImage() {

  // Initiate variables
  const [backgroundImage, setBackgroundImage] = useState(null);
  const location = useLocation().pathname;;
    
  // Update background image when location changes 
  useEffect(() => {

    // Set background image depending on current location 
    setBackgroundImage(location === '/' ? texturedBackgroundImage : untexturedBackgroundImage);

  }, [location]);

  // Return background image
  return backgroundImage;

}


function useCurrentPage() {
  
  const [currentPage, setCurrentPage] = useState(undefined);

  function resetCurrentPage() {
    setCurrentPage(undefined);
  }

  return {
    currentPage,
    setCurrentPage,
    resetCurrentPage
  }

}


/**
 * Retrieves the App component.
 * 
 * The App component contains the following elements
 * - A background image
 * - A Header component
 * - A main element, handling routes to all the content elements
 * - A Footer component
 * 
 * @since 1.0.0
 * 
 * @return {HTMLElement} HTML Element.
 */
function App() {

  // Initiate variables
  const { currentPage, setCurrentPage, resetCurrentPage } = useCurrentPage();

  // Return component
  return (
    <div className="App">
      <img src={useBackgroundImage()} className="background-image" width='1920' height='1080'/>
      <Header resetCurrentPage={resetCurrentPage}/>
      <main>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/gear' element={<Gear />}/>
          <Route path='/guides' element={<Guides currentPage={currentPage} setCurrentPage={setCurrentPage}/>}/>
          <Route path='/guides/:guideId' element={<Guides currentPage={currentPage} setCurrentPage={setCurrentPage}/>}/>
        </Routes>
      </main>
      <Footer />
    </div>
  );

}


// Export component
export default App;