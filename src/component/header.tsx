import './header.css';

import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../component/sjslogo.png';

function header() {
  return (
    <div className="Header">
      <Link to="/">
        <img src={logo} alt="ha" />
      </Link>
    </div>
  );
}

export default header;
