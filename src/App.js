import React, {useState} from 'react';
import {BrowserRouter, Router, Routes, Route} from 'react-router-dom';
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

  const location = useLocation().pathname;;
    
  switch (location) {
    case '/':
      return texturedBackgroundImage;
    default:
      return untexturedBackgroundImage;
  }

}

function App() {

  const [content, setContent] = useState('Home');

  const handleLinkClick = (event, page) => {
    event.preventDefault();
    setContent(page);
  };

  const renderContent = () => {
    switch (content) {
      case 'Home':
        return <Home />;
      case 'Gear':
        return <Gear />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <img src={useBackgroundImage()} className="background-image" width='1920' height='1080'/>
      <Header handleLinkClick={handleLinkClick} content={content}/>
      <main>
        <Routes>
          {/* {renderContent()} */}
          <Route path='/' element={<Home />}/>
          <Route path='/gear' element={<Gear />}/>
        </Routes>
      </main>
      <Footer />
    </div>
  );

}

export default App;
