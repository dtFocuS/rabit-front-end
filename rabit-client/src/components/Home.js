import React, { Component } from 'react';
import '../index.css';
import TaskForm from './TaskForm'

import { BrowserRouter as Route, NavLink } from 'react-router-dom';

class Home extends Component {
  state = {
    modalShow: false
  }

  render(){
    let modalClose = () => this.setState({ modalShow: false });
    return (
      <div id="home">
        <button type="button" class="btn btn-light" onClick={() => this.setState({ modalShow: true })}>Create Task</button>
        <TaskForm 
          show={this.state.modalShow}
          onHide={modalClose}
        />
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

          <div className="container col-sm-12 " id="your-tasks">

            <div className="row task-header">
                <h2>your tasks</h2>
            </div>

            <div className="row col-sm-12">
                <p>open task</p>
            </div>
            <div className="row col-sm-12">
                <p>open task</p>
            </div>
          </div>


          <div className="container col-sm-12 " id="available-tasks">

            <div className="row task-header">
              <h2>available tasks</h2>
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

export default Home;
