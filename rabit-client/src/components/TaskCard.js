import React, { Component } from 'react';
import { Card, Button, Accordion } from 'react-bootstrap';
import TaskForm from './modals/TaskForm'
import EditTaskForm from './modals/EditTaskForm'
import BidForm from './modals/BidForm'
import RemoveBidForm from './modals/RemoveBidForm'

import RemoveTaskForm from './modals/RemoveTaskForm'

import TaskBids from './TaskBids'



class TaskCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editTaskModalShow: false,
            removeTaskModalShow: false,
            taskBids: []
        }

    }

    getTask = () => {
        // console.log(task);
        fetch("http://localhost:3000/api/v1/tasks/" + this.props.task.id)
        .then(resp => resp.json())
        .then(task => {
          this.setState({taskBids: task.bids})
          console.log(task.bids)

        })
    }

    componentDidMount() {
      this.getTask()
    }

    render() {
        let editTaskModal = () => this.setState({ editTaskModalShow: false });
        let removeTaskModal = () => this.setState({ removeTaskModalShow: false });

        return(
            <div className="row">
                <Accordion>
                    <Card className="your-task-card">
                        <Accordion.Toggle as={Button} variant="plain" eventKey="0">
                            <Card.Header className="task-card-header-account-page">
                                <div className="row">
                                    <div className="column task-title">{this.props.task.name}</div>

                                    <div className="column task-time">{this.props.task.completed_by}</div>

                                </div>
                            </Card.Header>
                        </Accordion.Toggle>
                        <button type="button" className="column edit-task" onClick={() => this.setState({ editTaskModalShow: true })}>edit</button>
                        <EditTaskForm
                            show={this.state.editTaskModalShow}
                            onHide={editTaskModal}
                            onEditTask={this.props.onEditTask}
                            task={this.props.task}
                        />

                        <button type="button" className="column remove-task" onClick={() => this.setState({ removeTaskModalShow: true })}>remove</button>
                        <RemoveTaskForm
                            show={this.state.removeTaskModalShow}
                            onHide={removeTaskModal}
                            onRemoveTask={this.props.onRemoveTask}
                            task={this.props.task}
                        />

                        <Accordion.Collapse eventKey="0">
                            <Card.Body className="task-card-body-account-page">
                              <div className="row">

                                <div className="column">      {this.props.task.description}
                                </div>

                                <div className="task-bids container">
                                    <div className="row task-bids-header">
                                        <h2 className="task-bids-title">bids</h2>
                                    </div>
                                    <TaskBids
                                      className="column"
                                      bids={this.state.taskBids}/>
                                </div>

                              </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>

        );

    }




}


export default TaskCard;
