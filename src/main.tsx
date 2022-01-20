import './index.css';
import './util/rem';

import React from 'react';
import ReactDOM from 'react-dom';

import {App} from './App';
import NavMenu from './component/navBar';

ReactDOM.render(
  <React.StrictMode>
    <NavMenu />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
