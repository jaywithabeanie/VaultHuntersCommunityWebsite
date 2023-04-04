import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import Home from './components/pages/Home';
import Gear from './components/pages/gear/Gear';
import Header from './components/Header';
import Footer from './components/Footer';

// Stylesheets
import './css/style.scss'

// Import images
import texturedBackgroundImage from './images/assets/the_vault/background_textured.png';
import untexturedBackgroundImage from './images/assets/the_vault/background_untextured_colorless.png';

function useBackgroundImage() {

  const [backgroundImage, setBackgroundImage] = useState(null);
  const location = useLocation().pathname;;
    
  useEffect(() => {
    const image = new Image();
    image.src = location === '/' ? texturedBackgroundImage : untexturedBackgroundImage;

    image.onload = () => {
      setBackgroundImage(image.src);
    }
  }, [location]);

  return backgroundImage;

}

function App() {

  const [content, setContent] = useState('Home');

  const handleLinkClick = (event, page) => {
    event.preventDefault();
    setContent(page);
  };

  return (
    <div className="App">
      <img src={useBackgroundImage()} className="background-image" width='1920' height='1080'/>
      <Header handleLinkClick={handleLinkClick} content={content}/>
      <main>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/gear' element={<Gear />}/>
        </Routes>
      </main>
      <Footer />
    </div>
  );

}

export default App;
