import React, { Component } from 'react';

import TaskForm from './modals/TaskForm'
import EditTaskForm from './modals/EditTaskForm'
import EditAccountForm from './modals/EditAccountForm'

import TaskList from './TaskList';

import { Card, Button, Accordion } from 'react-bootstrap';

import '../index.css';

class Account extends Component {

  constructor(props) {
    super(props);
    this.state = {
      createTaskModalShow: false,
      editAccountModalShow: false,
      editTaskModalShow: false
    }

  }

  render(){
    let createTaskModal = () => this.setState({ createTaskModalShow: false });
    let editAccountModal = () => this.setState({ editAccountModalShow: false });
    let editTaskModal = () => this.setState({ editTaskModalShow: false });
    return (
      <div id="home">
        <button id="create-task-button" type="button" className="btn btn-light" onClick={() => this.setState({ createTaskModalShow: true })}>Create Task</button>
        <TaskForm
          show={this.state.createTaskModalShow}
          onHide={createTaskModal}
          createTask={this.props.createTask}
        />
        <div id="account-header" className="container">

          <div className="container" id="avatar-container-account-page">
            <img id="avatar-account-page" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmK2JrzaMkZJsK4SuRTgrWEiSFZBFd66UCrUrLJ53bh20Ag47nQw" alt="avatar" />
          </div>

          <div className="container">
            <div className="row">
              <h1 id="fullname-account-page">{this.props.user && this.props.user.name || null}</h1>
            </div>
            <div className="row">
              <p id="username-account-page">{this.props.user && "@" + this.props.user.username || null}</p>
            </div>
            <button className="row" id="edit-account-button" onClick={() => this.setState({ editAccountModalShow: true })}>edit</button>
            <EditAccountForm
              user={this.props.user}
              show={this.state.editAccountModalShow}
              onHide={editAccountModal}
              onCreateEditAccount={this.editAccount}
            />
          </div>
        </div>
        <div id="body">
            <div className="row task-header" id="your-tasks" >
                <h2 id="your-tasks-title">your tasks</h2>
            </div>
            {this.props.userTasks? <TaskList onEditTask={this.props.onEditTask} userTasks={this.props.userTasks}/> : null}
        </div>
      </div>
    );
  }
};

export default Account;
