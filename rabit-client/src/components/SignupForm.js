import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';


class SignupForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            password: "",
            location: "",
            valid: false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.name !== "" && this.state.username !== "" && this.state.password !== "" && this.state.location !=="") {
            console.log(this.state.valid)
            this.setState({
                valid: true
            })
            this.props.onCreate(this.state)
        }


    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="md"
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
                        <input type="text" id="name" placeholder="Full Name" onChange={this.handleChange} />
                        <input type="text" id="username" placeholder="Username"  onChange={this.handleChange} />
                        <input type="password" id="password" placeholder="Password"  onChange={this.handleChange} />
                        <input type="text" id="location" placeholder="Location" onChange={this.handleChange} />
                        <Button type="submit" onClick={this.props.onHide}>Create</Button>
                    </form>
                    
                </Modal.Body>
                <Modal.Footer>
                    
                </Modal.Footer>
            </Modal>
        );

    }

}

export default SignupForm;