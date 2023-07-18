import React from 'react';
import './Footer.scss'

import logo_small from '../../images/logo_small.png';

function Footer() {
  return (
    <footer className='footer-container'>

      <div className="navigation">
        <div className="logo background-parent">
          <img src={logo_small} className='background' />
        </div>
        <nav className="menu">
          <a href="https://discord.gg/dr9z3tKjBT" target='_blank' rel='noreferrer'>
            <span className='name'>Discord</span>
            <i className="icon fa-brands fa-discord"></i>
          </a>
          <a href="https://www.reddit.com/r/VaultHuntersMinecraft/" target='_blank' rel='noreferrer'>
            <span className='name'>Reddit</span>
            <i className="icon fa-brands fa-reddit-alien"></i>
          </a>
          <a href="https://vaulthunters.gg" target='_blank' rel='noreferrer'>
            <span className='name'>Official Website</span>
            <i className="icon fa-solid fa-globe"></i>
          </a>
          <a href="https://docs.google.com/spreadsheets/d/1Z1WkAWLo1iTmVQB5J9TJzkiNhx27LSbG--NlZbQA3uI/edit?usp=sharing" target='_blank' rel='noreferrer'>
            <span className='name'>Community Sheets</span>
            <i className="icon fa-solid fa-file-lines"></i>
          </a>
        </nav>
      </div>

      <div className="copyright">
        <p>&copy; 2023 • Website by jaywithabeanie • Additional Art by breadcrumb5550 • Additional Dev by freudplays</p>
      </div>

    </footer>
  );
}

export default Footer;
