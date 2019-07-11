import React, { Component } from 'react';

import TaskForm from './TaskForm'
import EditTaskForm from './EditTaskForm'

import { Card, Button, Accordion } from 'react-bootstrap';

import '../index.css';

class Account extends Component {

  constructor(props) {
    super(props);
    this.state = {
      createTaskModalShow: false,
      placeBidModalShow: false,
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

  render(){
    let createTaskModal = () => this.setState({ createTaskModalShow: false });
    let placeBidModal = () => this.setState({ placeBidModalShow: false });
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
              <h1 id="fullname-account-page">Full Name</h1>
            </div>
            <div className="row">
              <p id="username-account-page">@username</p>
            </div>
            <button className="row" id="edit-account-button">edit</button>
          </div>
        </div>
        <div id="body">
          <div className="container col-sm-12" id="your-tasks-account-page">

            <div className="row task-header-account-page">
                <h2 id="your-tasks-title">your tasks</h2>
            </div>

            <div className="row">
              <Accordion>
                <Card className="task-card-account-page">
                  <Accordion.Toggle as={Button} variant="plain" eventKey="0">
                    <Card.Header className="task-card-header-account-page">
                      <div className="row">
                        <div className="column task-title">Get Groceries</div>

                        <div className="column task-time">10:00am</div>
                        <button type="button" className="column edit-task" onClick={() => this.setState({ editTaskModalShow: true })}>edit</button>
                        <EditTaskForm
                          show={this.state.editTaskModalShow}
                          onHide={editTaskModal}
                          onEditTask={this.editTask}
                        />
                      </div>
                    </Card.Header>
                  </Accordion.Toggle>

                  <Accordion.Collapse eventKey="0">
                    <Card.Body className="task-card-body-account-page">Hello! I'm the body</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>

            <div className="row">
              <Accordion>
                <Card className="task-card-account-page">
                  <Accordion.Toggle as={Button} variant="plain" eventKey="0">
                    <Card.Header className="task-card-header-account-page">
                      <div className="row">
                        <div className="column task-title">Get Groceries</div>

                        <div className="column task-time">10:00am</div>
                        <button type="button" className="column edit-task" onClick={() => this.setState({ editTaskModalShow: true })}>edit</button>
                        <EditTaskForm
                          show={this.state.editTaskModalShow}
                          onHide={editTaskModal}
                          onEditTask={this.editTask}
                        />
                      </div>
                    </Card.Header>
                  </Accordion.Toggle>

                  <Accordion.Collapse eventKey="0">
                    <Card.Body className="task-card-body-account-page">Hello! I'm the body</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>

            <div className="row">
              <Accordion>
                <Card className="task-card-account-page">
                  <Accordion.Toggle as={Button} variant="plain" eventKey="0">
                    <Card.Header className="task-card-header-account-page">
                      <div className="row">
                        <div className="column task-title">Get Groceries</div>

                        <div className="column task-time">10:00am</div>
                        <button type="button" className="column edit-task" onClick={() => this.setState({ editTaskModalShow: true })}>edit</button>
                        <EditTaskForm
                          show={this.state.editTaskModalShow}
                          onHide={editTaskModal}
                          onEditTask={this.editTask}
                        />
                      </div>
                    </Card.Header>
                  </Accordion.Toggle>

                  <Accordion.Collapse eventKey="0">
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

export default Account;
