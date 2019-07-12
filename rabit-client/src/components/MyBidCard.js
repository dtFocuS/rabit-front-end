import React, { Component } from 'react';
import { Card, Button, Accordion } from 'react-bootstrap';
import BidForm from './modals/BidForm';


class MyBidCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeBidModalShow: false
        }
    }

    render() {
        let placeBidModal = () => this.setState({ placeBidModalShow: false });

        return(
            <div className="row">
                <Accordion>
                    <Card className="available-task-card">
                        <Accordion.Toggle as={Button} variant="plain" eventKey="1">
                            <Card.Header className="task-card-header-account-page">
                                <div className="row">
                                    <div className="column task-title">{this.props.task.name}</div>

                                    <div className="column task-time">{this.props.task.completed_by}</div>
                                    <button type="button" className="column bid-task" onClick={() => this.setState({ placeBidModalShow: true })}>+</button>
                                    <BidForm
                                        show={this.state.placeBidModalShow}
                                        onHide={placeBidModal}
                                        onCreateBid={this.createBid}
                                    />
                                </div>
                            </Card.Header>
                        </Accordion.Toggle>

                        <Accordion.Collapse eventKey="1">
                            <Card.Body className="task-card-body-account-page">{this.props.task.description}</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>



        );
    }


}

export default MyBidCard;