// Dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

// Components
import App from './App';

// Render App component in 'root' element
ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter basename='/'>
        <App />
    </BrowserRouter>
);