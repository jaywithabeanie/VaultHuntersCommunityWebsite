import React from 'react';
import {Link} from 'react-router-dom';
import '../css/components/Header.scss';

function Header(props) {

  const disableLinkClick = (event) => {
    event.preventDefault();
  }

  return (
    <header currentPage={props.content}>
      <Link to="/" onClick={() => window.scrollTo(0, 0)} className="logo"></Link>
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
