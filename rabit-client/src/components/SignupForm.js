import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';


class SignupForm extends Component {

    handleSubmit = (event) => {
        event.preventDefault();

    }

    handleChange = (event) => {
        console.log(event.target.value)
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create Account
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" id="name" placeholder="Full Name" onChange={this.handleChange}/>
                        <input type="text" id="username" placeholder="Username"  onChange={this.handleChange} />
                        <input type="password" id="password" placeholder="Password"  onChange={this.handleChange} />
                        <input type="text" id="location" placeholder="Location" onChange={this.handleChange} />

                    </form>
                    <Button onClick={this.props.onHide}>Create</Button>
                </Modal.Body>
                <Modal.Footer>
                    
                </Modal.Footer>
            </Modal>
        );

    }

}

export default SignupForm;