import React, { Component } from 'react';
import '../index.css';
import rabit from '../rabit-logo.png'

import { BrowserRouter as Route, NavLink } from 'react-router-dom';

class Header extends Component {

  constructor() {
		super()
    this.state = {
      user: null
    }
  }


  fetchUser = () => {
    console.log(this)
    fetch('http://localhost:3000/api/v1/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(res => res.json())
    .then(json => {
      this.setState({user: json.user});
    })
  }

  componentDidMount() {
    this.fetchUser()
  }


  render(){

    function loggedIn() {
      if (localStorage.getItem('jwt') !== '') {
        return true
      } else {
        return false
      }
    }

    function authenticationLink() {
      if (loggedIn()) {
        return "log out"
      } else {
        return "login"
      }
    }

    return (

      <div id="header-band">
        <p id="authentication-links">
          <NavLink
            to="/login"
            exact
            activeStyle={{
            }}
          >{authenticationLink()}</NavLink>
        </p>

        <div>
          <NavLink
            to="/"
            exact
            activeStyle={{
            }}
          ><img id="rabit-logo" src={rabit} alt="Rabit" /></NavLink>
        </div>

        <div id="navigation-links">
          <h4 className="nav-link">
            <NavLink
              to="/account"
              exact
              activeStyle={{
              }}
            >account</NavLink>
          </h4>
          <h4 className="nav-link">
            <NavLink
              to="/"
              exact
              activeStyle={{
              }}
            >home</NavLink>
          </h4>
        </div>
      </div>
    );
  }
};

export default Header;
