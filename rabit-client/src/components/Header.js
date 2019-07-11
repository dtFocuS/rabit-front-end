import React, { Component } from 'react';
import '../index.css';
import rabit from '../rabit-logo.png'
import rabit2 from '../rabit-alternate.png'
import { Dropdown, DropdownButton } from 'react-bootstrap'

import { BrowserRouter as Route, NavLink } from 'react-router-dom';

class Header extends Component {

  constructor() {
		super()
    this.state = {
      username: ""
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
      if (json.user) {
        this.setState({username: json.user.username});
      }
    })
  }

  componentDidMount() {
    this.fetchUser()
  }

  loggedIn = () => {
    if (localStorage.getItem('jwt') !== '') {
      return true
    } else {
      return false
    }
  }

  authenticationLink = () => {
    if (this.loggedIn()) {
      return (

        <div id="header-dropdown-button">
        <DropdownButton
          alignRight
          title={"@" + this.state.username + " " }
          id="dropdown-menu-align-right"
          >
            <Dropdown.Item href="/">Home</Dropdown.Item>
            <Dropdown.Item href="/account">Account</Dropdown.Item>
            <Dropdown.Item href="/login">Log Out</Dropdown.Item>
        </DropdownButton>
      </div>)
    } else {
      return (<p id="authentication-links">
        <NavLink
          style={{color: "whitesmoke"}}
          to="/login"
          exact
          activeStyle={{
          }}
        >login</NavLink>
      </p>)
    }
  }


  render(){

    return (

      <div id="header-band">

        {this.authenticationLink()}


        <div id="rabit-logo-wrapper">
          <NavLink
            to="/"
            exact
            activeStyle={{
            }}
          ><img id="rabit-logo" src={rabit2} alt="Rabit" /></NavLink>
        </div>


      </div>
    );
  }
};

export default Header;
