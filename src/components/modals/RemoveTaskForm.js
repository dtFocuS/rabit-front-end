import React, { Component } from 'react';
import { Modal, Button, InputGroup, FormControl, Form } from 'react-bootstrap';


class RemoveTaskForm extends Component {
  state = {

  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onHide();
    this.props.onRemoveTask(this.props.task);

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
          Would you like to remove this task?
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
          <Form onSubmit={this.handleSubmit} className={displayErrors ? 'displayErrors' : ''} noValidate>
              <Button type="submit" className="modal-delete-buttons" onClick={this.handleClick}>DELETE</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
  }
}


export default RemoveTaskForm;
