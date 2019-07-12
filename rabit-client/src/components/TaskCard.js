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

    render() {
        let editTaskModal = () => this.setState({ editTaskModalShow: false });
        let removeTaskModal = () => this.setState({ removeTaskModalShow: false });
        console.log(this.props.task)

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
                            <Card.Body className="task-card-body-account-page">{this.props.task.description}
                            <TaskBids
                              bids={this.props.userTasks}/>
                              <div>stuff</div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>

        );

    }




}


export default TaskCard;
