import React, { Component } from 'react';
import { Card, Button, Accordion } from 'react-bootstrap';
import TaskForm from './modals/TaskForm'
import EditTaskForm from './modals/EditTaskForm'
import BidForm from './modals/BidForm'


class TaskCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editTaskModalShow: false,
            task: this.props.task
        }

    }


    render() {
        let editTaskModal = () => this.setState({ editTaskModalShow: false });

        return(
            <div className="row">
                <Accordion>
                    <Card className="your-task-card">
                        <Accordion.Toggle as={Button} variant="plain" eventKey="0">
                            <Card.Header className="task-card-header-account-page">
                                <div className="row">
                                    <div className="column task-title">{this.state.task.name}</div>

                                    <div className="column task-time">{this.state.task.completed_by}</div>

                                </div>
                            </Card.Header>
                        </Accordion.Toggle>
                        <button type="button" className="column edit-task" onClick={() => this.setState({ editTaskModalShow: true })}>edit</button>
                        <EditTaskForm
                            show={this.state.editTaskModalShow}
                            onHide={editTaskModal}
                            onEditTask={this.props.onEditTask}
                            task={this.state.task}
                        />

                        <Accordion.Collapse eventKey="0">
                            <Card.Body className="task-card-body-account-page">{this.state.task.description}</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>

        );

    }




}


export default TaskCard;
