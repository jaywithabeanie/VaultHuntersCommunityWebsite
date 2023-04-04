import React from 'react';
import {Link} from 'react-router-dom';
import '../css/components/Header.scss';

import logo_small from '../images/logo_small.png';
import logo_large from '../images/logo_large.png';

function Header(props) {

  const disableLinkClick = (event) => {
    event.preventDefault();
  }

  return (
    <header currentPage={props.content}>
      <Link to="/" onClick={() => window.scrollTo(0, 0)} className="logo background-parent">
        <img src={logo_small} className='logo-small background'/>
        <img src={logo_large} className='logo-large background'/>
      </Link>
      <nav className="menu">
        <ul>
          <li>
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/gear" onClick={() => window.scrollTo(0, 0)}>
              Gear
            </Link>
          </li>
          {/* <li>
            <Link href="/" onClick={disableLinkClick} disabled={true}>
              Skills
            </Link>
          </li>
          <li>
            <Link href="/" onClick={disableLinkClick} disabled={true}>
              Patch Notes
            </Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );

}

export default Header;
