import React, { Component } from 'react';
import { Card, Button, Accordion } from 'react-bootstrap';
import TaskForm from './modals/TaskForm'
import EditTaskForm from './modals/EditTaskForm'
import BidForm from './modals/BidForm'


class TaskBidCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
          
        }
    }

    render() {

        console.log(this.props.task.bids)
        return(
            <div className="row">

                    <Card className="available-task-card">

                            <Card.Header className="task-card-header-account-page">
                                stuff
                            </Card.Header>

                    </Card>

            </div>

        );
    }



}

export default TaskBidCard;
