import React, { Component } from 'react';
import BidCard from './BidCard';
import TaskBidCard from './TaskBidCard'


class YourTasksBids extends Component {

    render() {
      console.log(this.props.bids)

        return (
            <React.Fragment>
                {

                    this.props.bids ? this.props.bids.map(bid =>
                        <TaskBidCard key={bid.id} bid={bid} />
                    ) : null
                }
            </React.Fragment>

        );
    }


}

export default YourTasksBids;
