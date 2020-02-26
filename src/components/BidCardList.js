import React, { Component } from 'react';
import BidCard from './BidCard';


class BidCardList extends Component {

    render() {

        return (
            <React.Fragment>
                {
                    this.props.otherTasks.map(task =>
                        <BidCard key={task.id} task={task} onPlaceBid={this.props.onPlaceBid} />
                    )
                }
            </React.Fragment>

        );
    }


}

export default BidCardList;