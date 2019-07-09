import React, { Component } from 'react';
import './Header.css';
import rabit from './rabit-logo.png'

import { BrowserRouter as Route, NavLink } from 'react-router-dom';

class Header extends Component {

  render(){
    return (

      <div id="header-band">
        <div id="authentication-links">
          <NavLink
            to="/login"
            exact
            activeStyle={{
            }}
          >login</NavLink>
        </div>

        <div>
          <NavLink
            to="/"
            exact
            activeStyle={{
            }}
          ><img id="rabit-logo" src={rabit} alt="Rabit" /></NavLink>
        </div>

        <div id="navigation-links">
          <NavLink
            to="/account"
            exact
            activeStyle={{
            }}
          >account</NavLink>
        </div>
      </div>
    );
  }
};

export default Header;
