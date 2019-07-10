import React, { Component } from 'react';
import '../index.css';
import TaskForm from './TaskForm'

import { BrowserRouter as Route, NavLink } from 'react-router-dom';

class Home extends Component {
  state = {
    modalShow: false
  }

  createTask = (newTask) => {
    console.log(newTask);
  }

  render(){
    let modalClose = () => this.setState({ modalShow: false });
    return (
      <div id="home">

        <button id="create-task-button" type="button" className="btn btn-light" onClick={() => this.setState({ modalShow: true })}>Create Task</button>
        <TaskForm
          show={this.state.modalShow}
          onHide={modalClose}
          onCreateTask={this.createTask}
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
            ><h1 id="account-name">account</h1></NavLink>
          </div>

          <div className="container col-sm-12 " id="your-tasks">

            <div className="row task-header">
                <h2 id="your-tasks-title">your tasks</h2>
            </div>

            <div className="task row">
                <p>open task</p>
            </div>
            <div className="task row">
                <p>open task</p>
            </div>
          </div>


          <div className="container col-sm-12 " id="available-tasks">

            <div className="row task-header">
              <h2 id="available-tasks-title">available tasks</h2>
            </div>

            <div className="task row">
                <p>open task</p>
            </div>
            <div className="task row">
                <p>open task</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
