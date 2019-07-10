import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';


class TaskForm extends Component {
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
            this.props.onCreateTask(this.state);
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
                        Create Task
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleSubmit} className={displayErrors ? 'displayErrors' : ''} noValidate>
                        <input type="text" id="name" placeholder="Name" onChange={this.handleChange} required/>
                        <input type="textarea" id="description" placeholder="Description" onChange={this.handleChange} required/>
                        <input type="text" id="address" placeholder="Address" onChange={this.handleChange} required/>
                        <input type="text" id="city" placeholder="City" onChange={this.handleChange} required/>
                        <input type="text" id="state" placeholder="State" onChange={this.handleChange} required/>
                        <input type="text" id="zip_code" placeholder="Zip Code" onChange={this.handleChange} required/>
                        <input type="text" id="prefer_cost" placeholder="Cost" onChange={this.handleChange} required/>
                        
                        <Button type="submit" onClick={this.handleClick}>Create</Button>
                    </form>
                    

                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        );
    }


}


export default TaskForm;