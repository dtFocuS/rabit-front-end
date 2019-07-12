import React, { Component } from 'react';
import { Card, Button, Accordion } from 'react-bootstrap';
import UpdateBidForm from './modals/UpdateBidForm';


class MyBidCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateBidModalShow: false
        }
    }

    render() {
        let updateBidModal = () => this.setState({ updateBidModalShow: false });

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
