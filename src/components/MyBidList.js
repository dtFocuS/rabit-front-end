import React, { Component } from 'react';
import MyBidCard from './MyBidCard'


class MyBidList extends Component {

    render() {

        return (
            <React.Fragment>
                {
                    this.props.bidTasks.map(task =>
                        <MyBidCard key={task.id} task={task} onPlaceBid={this.props.onPlaceBid} onRemoveBid={this.props.onRemoveBid}/>
                    )
                }
            </React.Fragment>

        );
    }


}

export default MyBidList;