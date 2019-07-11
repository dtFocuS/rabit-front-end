import React, { Component } from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';


class BidForm extends Component {
    state = {

    }

    handleClick = (event) => {
        //this.props.onHide();

    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (!event.target.checkValidity() || !parseInt(this.state.zip_code)) {
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
                    <form onSubmit={this.handleSubmit} className={displayErrors ? 'displayErrors' : ''} noValidate>
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl type="number" aria-label="Amount (to the nearest dollar)" />
                      <InputGroup.Append>
                        <InputGroup.Text>.00</InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                        <input type="text" id="eta" placeholder="ETA" onChange={this.handleChange} required/>

                        <Button type="submit" onClick={this.handleClick}>bid</Button>
                    </form>


                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        );
    }


}


export default BidForm;
