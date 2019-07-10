import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class TaskForm extends Component {

    render() {
        return(

            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create Task
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" id="name" placeholder="Full Name" onChange={this.handleChange} />
                        <input type="text" id="username" placeholder="Username" onChange={this.handleChange} />
                        <input type="password" id="password" placeholder="Password" onChange={this.handleChange} />
                        <input type="text" id="default_location" placeholder="Location" onChange={this.handleChange} />
                        <Button type="submit" onClick={this.props.onHide}>Create</Button>
                    </form>

                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        );
    }


}


export default TaskForm;