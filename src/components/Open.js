import React, { Component } from 'react';

import TaskForm from './modals/TaskForm'
import EditTaskForm from './modals/EditTaskForm'
import EditAccountForm from './modals/EditAccountForm'
import BidForm from './modals/BidForm'

import { BrowserRouter as Route, NavLink } from 'react-router-dom';

import { Card, Button, Accordion } from 'react-bootstrap';

import '../index.css';

class Open extends Component {

  constructor(props) {
    super(props);
    this.state = {
      createTaskModalShow: false,
      placeBidModalShow: false,
      editTaskModalShow: false
    }
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
          onCreateTask={this.props.onCreateTask}
          userId={this.props.userId}
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
          <div className="container col-sm-12 " id="open-tasks">

            <div className="row open-task-header">
              <h2 id="your-open-tasks-title">your open tasks</h2>
            </div>

            <div className="row">
              <Accordion>
                <Card className="open-task-card">
                  <Accordion.Toggle as={Button} variant="plain" eventKey="1">
                    <Card.Header className="task-card-header-account-page">
                      <div className="row">
                        <div className="column task-title">Get Groceries</div>

                        <div className="column task-time">10:00am</div>
                        <button type="button" className="column bid-task" onClick={() => this.setState({ placeBidModalShow: true })}>+</button>
                        <BidForm
                          show={this.state.placeBidModalShow}
                          onHide={placeBidModal}
                          onCreateBid={this.createBid}
                        />
                      </div>
                    </Card.Header>
                  </Accordion.Toggle>

                  <Accordion.Collapse eventKey="1">
                    <Card.Body className="task-card-body-account-page">Hello! I'm the body</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>

            <div className="row">
              <Accordion>
                <Card className="open-task-card">
                  <Accordion.Toggle as={Button} variant="plain" eventKey="1">
                    <Card.Header className="task-card-header-account-page">
                      <div className="row">
                        <div className="column task-title">Get Groceries</div>

                        <div className="column task-time">10:00am</div>
                        <button type="button" className="column bid-task" onClick={() => this.setState({ placeBidModalShow: true })}>+</button>
                        <BidForm
                          show={this.state.placeBidModalShow}
                          onHide={placeBidModal}
                          onCreateBid={this.createBid}
                        />
                      </div>
                    </Card.Header>
                  </Accordion.Toggle>

                  <Accordion.Collapse eventKey="1">
                    <Card.Body className="task-card-body-account-page">Hello! I'm the body</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
            <div className="row">
              <Accordion>
                <Card className="open-task-card">
                  <Accordion.Toggle as={Button} variant="plain" eventKey="1">
                    <Card.Header className="task-card-header-account-page">
                      <div className="row">
                        <div className="column task-title">Get Groceries</div>

                        <div className="column task-time">10:00am</div>
                        <button type="button" className="column bid-task" onClick={() => this.setState({ placeBidModalShow: true })}>+</button>
                        <BidForm
                          show={this.state.placeBidModalShow}
                          onHide={placeBidModal}
                          onCreateBid={this.createBid}
                        />
                      </div>
                    </Card.Header>
                  </Accordion.Toggle>

                  <Accordion.Collapse eventKey="1">
                    <Card.Body className="task-card-body-account-page">Hello! I'm the body</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Open;
