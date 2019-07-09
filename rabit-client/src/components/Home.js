import React, { Component } from 'react';
import '../index.css';

import { BrowserRouter as Route, NavLink } from 'react-router-dom';

class Home extends Component {

  render(){
    return (
      <div id="home">
        <div id="account-link" className="container">

          <div className="row">
            <NavLink
              to="/account"
              exact
              activeStyle={{
              }}
            ><img id="avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmK2JrzaMkZJsK4SuRTgrWEiSFZBFd66UCrUrLJ53bh20Ag47nQw" alt="avatar" /></NavLink>

            <NavLink
              to="/account"
              exact
              activeStyle={{
              }}
            ><h1>account</h1></NavLink>
          </div>

          <div className="container" id="your-tasks">

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


          <div className="container" id="available-tasks">

            <div className="row task-header">
              <div className="col-sm-12">
                <h2>available tasks</h2>
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

export default Home;
