import React from 'react';
import '../css/components/Footer.scss'

import logo_small from '../images/logo_small.png';

function Footer () {
  return (
    <footer>

      <div className="navigation">
        <img src={logo_small} className='logo'/>
        <nav className="menu">
          <a href="https://discord.gg/dr9z3tKjBT" target='_blank' rel='noreferrer'>
            <span>Discord</span>
            <i className="fa-brands fa-discord"></i>
          </a>
          <a href="https://www.reddit.com/r/VaultHuntersMinecraft/" target='_blank' rel='noreferrer'>
            <span>Reddit</span>
            <i className="fa-brands fa-reddit-alien"></i>
          </a>
          <a href="https://vaulthunters.gg" target='_blank' rel='noreferrer'>
            <span>Official Website</span>
            <i className="fa-solid fa-globe"></i>
          </a>
          <a href="https://docs.google.com/spreadsheets/d/1Z1WkAWLo1iTmVQB5J9TJzkiNhx27LSbG--NlZbQA3uI/edit?usp=sharing" target='_blank' rel='noreferrer'>
            <span>Community Sheets</span>
            <i className="fa-solid fa-file-lines"></i>
          </a>
        </nav>
      </div>

      <div className="copyright">
        <p>&copy; 2023 • Website by jayy#6889 • Additional Art by Breadcrumb5550#5550</p>
      </div>

    </footer>
  );
}

export default Footer;
