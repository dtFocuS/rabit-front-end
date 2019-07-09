import React, { Component } from 'react';
import './Header.css';
import rabit from './rabit-logo.png'

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

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
          <img id="rabit-logo" src={rabit} alt="Rabit" />
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
