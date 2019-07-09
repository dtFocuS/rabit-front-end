import React, { Component } from 'react';
import '../index.css';

import { BrowserRouter as NavLink } from 'react-router-dom';

class Account extends Component {

  render(){
    return (
      <div id="home">
        <div id="account-header" className="container">

          <div className="row">
            <img id="avatar-account-page" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmK2JrzaMkZJsK4SuRTgrWEiSFZBFd66UCrUrLJ53bh20Ag47nQw" alt="avatar" />
            <h1 id="username-account-page">username</h1>
            <p id="fullname-account-page">name</p>
          </div>

          <div className="container" id="your-tasks-account-page">

            <div className="row task-header">
              <div className="col-sm-12">
                <h2>your tasks</h2>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <p>open task</p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <p>open task</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Account;
