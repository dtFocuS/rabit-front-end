import React, { Component } from 'react';
import '../index.css';

class Account extends Component {

  render(){
    return (
      <div id="home">
        <div id="account-header" className="container">

          <div className="container" id="avatar-container-account-page">
            <img id="avatar-account-page" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmK2JrzaMkZJsK4SuRTgrWEiSFZBFd66UCrUrLJ53bh20Ag47nQw" alt="avatar" />
          </div>

          <div className="container">
            <div className="row">
              <h1 id="username-account-page">name</h1>
            </div>
            <div className="row">
              <p id="fullname-account-page">username</p>
            </div>
          </div>

          <div className="container col-sm-12 " id="your-tasks-account-page">

            <div className="row task-header-account-page">
              <h2>your tasks</h2>
            </div>

            <div className="row col-sm-12">
                <p>open task</p>
            </div>
            <div className="row col-sm-12">
                <p>open task</p>
            </div>

          </div>
        </div>
      </div>
    );
  }
};

export default Account;
