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
    return(
      <div className="task-bid">
        {"$" + this.props.bid.amount}
      </div>
    );
  }
}

export default TaskBidCard;
