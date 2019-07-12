import React, { Component } from 'react';
import TaskCard from './TaskCard';


class TaskList extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         currentTasks: this.props.userTasks
    //     }
    // }


    render() {

        return(
            <React.Fragment>
                {
                    this.props.userTasks.map(task =>
                        <TaskCard key={task.id} task={task} onEditTask={this.props.onEditTask} onRemoveTask={this.props.onRemoveTask}/>
                    )
                }
            </React.Fragment>

        );
    }




}

export default TaskList;
