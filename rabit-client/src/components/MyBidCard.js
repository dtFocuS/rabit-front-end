import React, { Component } from 'react';
import { Card, Button, Accordion } from 'react-bootstrap';
import UpdateBidForm from './modals/UpdateBidForm';
import RemoveBidForm from './modals/RemoveBidForm'


class MyBidCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateBidModalShow: false,
            removeBidModalShow: false
        }
    }

    render() {
        let updateBidModal = () => this.setState({ updateBidModalShow: false });
        let removeBidModal = () => this.setState({ removeBidModalShow: false });

        return(
            <div className="row">
                <Accordion>
                    <Card className="available-task-card">
                        <Accordion.Toggle as={Button} variant="plain" eventKey="1">
                            <Card.Header className="task-card-header-account-page">
                                <div className="row">
                                    <div className="column task-title">{this.props.task.name}</div>

                                    <div className="column task-time">{this.props.task.completed_by}</div>
                                </div>
                            </Card.Header>
                        </Accordion.Toggle>
                        <button type="button" className="column my-bid-update" onClick={() => this.setState({ updateBidModalShow: true })}>update</button>
                        <UpdateBidForm
                            show={this.state.updateBidModalShow}
                            onHide={updateBidModal}
                            onCreateBid={this.createBid}
                        />

                        <button type="button" className="column remove-bid" onClick={() => this.setState({ removeBidModalShow: true })}>remove</button>
                        <RemoveBidForm
                            show={this.state.removeBidModalShow}
                            onHide={removeBidModal}
                            onRemoveBid={this.props.onRemoveBid}
                            task={this.props.task}
                        />

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
