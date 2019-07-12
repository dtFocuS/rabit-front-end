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
      console.log(this.props.userTasks);

        return(
            <React.Fragment>
                {
                    this.props.userTasks.map(task =>
                        <TaskCard key={task.id} task={task} onEditTask={this.props.onEditTask}
                        userTasks={this.props.userTasks}/>
                    )
                }
            </React.Fragment>

        );
    }




}

export default TaskList;
