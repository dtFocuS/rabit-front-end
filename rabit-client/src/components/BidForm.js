import React, { Component } from 'react';
import { Modal, Button, InputGroup, FormControl, Form } from 'react-bootstrap';


class BidForm extends Component {
    state = {

    }

    handleClick = (event) => {
        //this.props.onHide();

    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (!event.target.checkValidity()) {
            this.setState({ displayErrors: true });
            return;
        } else {
            this.setState({ displayErrors: false });
            this.props.onHide();
            this.props.onCreateBid(this.state);
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        const { displayErrors } = this.state;
        return(

            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Place Bid
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit} className={displayErrors ? 'displayErrors' : ''} noValidate>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl type="number" id="amount" placeholder="0" onChange={this.handleChange} required aria-label="Amount (to the nearest dollar)" />
                      </InputGroup>

                      <InputGroup className="mb-3">
                        <FormControl
                          type="text" id="eta" placeholder="ETA" onChange={this.handleChange} required
                        />
                      </InputGroup>
                        <Button type="submit" onClick={this.handleClick}>Bid</Button>
                    </Form>


                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        );
    }


}


export default BidForm;
