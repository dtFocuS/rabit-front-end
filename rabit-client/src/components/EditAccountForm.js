import React, { Component } from 'react';
import { Modal, Row, Col, Button, InputGroup, FormControl, Form } from 'react-bootstrap';


class EditAccountForm extends Component {
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
          Edit Account
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
          <Form onSubmit={this.handleSubmit} className={displayErrors ? 'displayErrors' : ''} noValidate>
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1"> </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  type="text" id="name" value={this.props.currentUser && this.props.currentUser.name || null} onChange={this.handleChange} required
                />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  type="text" id="username" value={this.props.currentUser && this.props.currentUser.username || null} onChange={this.handleChange} required
                />
              </InputGroup>
            </Col>
          </Row>
          <InputGroup className="mb-3">
            <FormControl
              type="text" id="image" placeholder="Photo" onChange={this.handleChange} required
            />
          </InputGroup>


              <Button type="submit" className="modal-buttons" onClick={this.handleClick}>Update</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default EditAccountForm;
