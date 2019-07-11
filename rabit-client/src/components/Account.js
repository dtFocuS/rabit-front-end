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


  createTask = (newTask) => {
    console.log(newTask);
    const time = newTask.hours + ":" + newTask.minutes + " " + newTask.ampm;
    console.log(this.props.currentUserId);
    const dollarAmount = parseFloat(newTask.prefer_cost);
    // fetch("http://localhost:3000/api/v1/tasks", {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ task: { name: newTask.name, description: newTask.description, address: newTask.address, city: newTask.city, state: newTask.state, zip_code: newTask.zip_code, prefer_cost: dollarAmount, completed_by: time, user_id: this.props.currentUserId} })
    // })
    // .then(resp => resp.json())
    // .then(json => console.log(json))
  }

  editTask = (editTask) => {
    console.log(editTask);
  }

  editAccount = (editAcount) => {
    console.log(editAcount);
  }

  render(){
    let createTaskModal = () => this.setState({ createTaskModalShow: false });
    let editAccountModal = () => this.setState({ editAccountModalShow: false });
    let editTaskModal = () => this.setState({ editTaskModalShow: false });
    return (
      <div id="home">
        <button id="create-task-button-account-page" type="button" className="btn btn-light" onClick={() => this.setState({ createTaskModalShow: true })}>Create Task</button>
        <TaskForm
          show={this.state.createTaskModalShow}
          onHide={createTaskModal}
          onCreateTask={this.createTask}
          currentUserId={this.props.currentUserId}
        />
        <div id="account-header" className="container">

          <div className="container" id="avatar-container-account-page">
            <img id="avatar-account-page" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmK2JrzaMkZJsK4SuRTgrWEiSFZBFd66UCrUrLJ53bh20Ag47nQw" alt="avatar" />
          </div>

          <div className="container">
            <div className="row">
              <h1 id="fullname-account-page">{this.props.currentUser && this.props.currentUser.name || null}</h1>
            </div>
            <div className="row">
              <p id="username-account-page">{this.props.currentUser && "@" + this.props.currentUser.username || null}</p>
            </div>
            <button className="row" id="edit-account-button" onClick={() => this.setState({ editAccountModalShow: true })}>edit</button>
            <EditAccountForm
              currentUser={this.props.currentUser}
              show={this.state.editAccountModalShow}
              onHide={editAccountModal}
              onCreateEditAccount={this.editAccount}
              currentUserId={this.props.currentUserId}
            />
          </div>
        </div>
        <div id="body">
          <div className="container col-sm-12" id="your-tasks-account-page">

            <div className="row task-header-account-page">
                <h2 id="your-tasks-title">your tasks</h2>
            </div>

            {this.props.userTasks? <TaskList onEditTask={this.props.onEditTask} userTasks={this.props.userTasks}/> : null}

          </div>
        </div>
      </div>
    );
  }
};

export default Account;
