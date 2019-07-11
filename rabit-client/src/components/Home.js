import React, { Component } from 'react';
import '../index.css';
import TaskForm from './TaskForm'
import EditTaskForm from './EditTaskForm'
import BidForm from './BidForm'

import { BrowserRouter as Route, NavLink } from 'react-router-dom';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      createTaskModalShow: false,
      placeBidModalShow: false,
      editTaskModalShow: false
    }

  }

  
  

  createTask = (newTask) => {
    //console.log(newTask);
    const time = newTask.hours + ":" + newTask.minutes + " " + newTask.ampm;
    //console.log(this.props.currentUserToken());
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

  createBid = (newBid) => {
    console.log(newBid);
  }

  editTask = (editTask) => {
    console.log(editTask);
  }

  render(){
    let createTaskModal = () => this.setState({ createTaskModalShow: false });
    let placeBidModal = () => this.setState({ placeBidModalShow: false });
    let editTaskModal = () => this.setState({ editTaskModalShow: false });
    return (
      <div id="home">

        <button id="create-task-button" type="button" className="btn btn-light" onClick={() => this.setState({ createTaskModalShow: true })}>Create Task</button>
        <TaskForm
          show={this.state.createTaskModalShow}
          onHide={createTaskModal}
          onCreateTask={this.createTask}
          currentUserId={this.props.currentUserId}
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
                <div className="column task-title">Get Groceries</div>
                <div className="column task-time">10:00am</div>
                <button type="button" className="column edit-task" onClick={() => this.setState({ editTaskModalShow: true })}>edit</button>
                <EditTaskForm
                  show={this.state.editTaskModalShow}
                  onHide={editTaskModal}
                  onEditTask={this.editTask}
                />
            </div>
            <div className="task row">
                <div className="column task-title">Get Groceries</div>
                <div className="column task-time">10:00am</div>
                <button type="button" className="column edit-task" onClick={() => this.setState({ editTaskModalShow: true })}>edit</button>
                <EditTaskForm
                  show={this.state.editTaskModalShow}
                  onHide={editTaskModal}
                  onEditTask={this.editTask}
                />
            </div>
          </div>


          <div className="container col-sm-12 " id="available-tasks">

            <div className="row task-header">
              <h2 id="available-tasks-title">available tasks</h2>
            </div>

            <div className="task row">
                <div className="column task-title">Get Groceries</div>
                <div className="column task-time">10:00am</div>

                <button type="button" className="column add-task" onClick={() => this.setState({ placeBidModalShow: true })}>+</button>
                <BidForm
                  show={this.state.placeBidModalShow}
                  onHide={placeBidModal}
                  onCreateBid={this.createBid}
                />

            </div>
            <div className="task row">
                <div className="column task-title">Get Groceries</div>
                <div className="column task-time">10:00am</div>
                <button type="button" className="column add-task" onClick={() => this.setState({ placeBidModalShow: true })}>+</button>
                <BidForm
                  show={this.state.placeBidModalShow}
                  onHide={placeBidModal}
                  onCreateBid={this.createBid}
                />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
