import React, { Component } from 'react';
import '../index.css';
import TaskForm from './modals/TaskForm';
import EditTaskForm from './modals/EditTaskForm'
import BidForm from './modals/BidForm'

import TaskList from './TaskList';
import BidCardList from './BidCardList';
import MyBidList from './MyBidList';

import { BrowserRouter as Route, NavLink } from 'react-router-dom';
import { Card, Button, Accordion } from 'react-bootstrap';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      createTaskModalShow: false
    }
  }

  render(){
    let createTaskModal = () => this.setState({ createTaskModalShow: false });

    //let placeBidModal = () => this.setState({ placeBidModalShow: false });
    //let editTaskModal = () => this.setState({ editTaskModalShow: false });

    let placeBidModal = () => this.setState({ placeBidModalShow: false });

    return (
      <div id="home">

        <button id="create-task-button" type="button" className="btn btn-light" onClick={() => this.setState({ createTaskModalShow: true })}>Create Task</button>
        <TaskForm
          show={this.state.createTaskModalShow}
          onHide={createTaskModal}
          createTask={this.props.onCreateTask}
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
            ><h1 id="account-name">{this.props.user && this.props.user.name || null}</h1></NavLink>
          </div>
        </div>
        <div id="body">

        <div id="body" className="container">
            <div className="row task-header" id="your-tasks" >
                <h2 id="your-tasks-title">your tasks</h2>
            </div>
            {this.props.userTasks? <TaskList onEditTask={this.props.onEditTask} userTasks={this.props.userTasks}/> : null}
        </div>


          <div className="container col-sm-12 " id="available-tasks">
            <div className="row task-header" >
                <h2 id="available-tasks-title">available tasks</h2>
            </div>
            {this.props.otherTasks ? <BidCardList onPlaceBid={this.props.placeBid} otherTasks={this.props.otherTasks} /> : null}
          </div>
          <div className="container col-sm-12 " id="available-tasks">

            <div className="row task-header">
              <h2 id="available-tasks-title">to be completed</h2>
            </div>
            {this.props.bidTasks ? <MyBidList bidTasks={this.props.bidTasks}/> : null}
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
