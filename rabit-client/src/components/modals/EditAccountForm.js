import React, { Component } from 'react';
import { Modal, Row, Col, Button, InputGroup, FormControl, Form } from 'react-bootstrap';


class EditAccountForm extends Component {
  constructor(props) {
      super(props);
      this.state = {
          name: "",
          username: "",
          password: "",
          confirm: "",
          address: "",
          city: "",
          state: "",
          zip_code: "",
          valid: false
      }
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
                  type="text" id="username" value={this.props.currentUser && this.props.currentUser.username || null} required onChange={this.handleChange}
                />
              </InputGroup>
            </Col>
          </Row>
          <InputGroup className="mb-3">
            <FormControl id="address" value={this.props.currentUser && this.props.currentUser.address || null} onChange={this.handleChange} required />
          </InputGroup>
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <FormControl id="city" value={this.props.currentUser && this.props.currentUser.city || null} onChange={this.handleChange} required />
              </InputGroup>
            </Col>

            <Col>
              <InputGroup className="mb-3">
                <FormControl id="state" value={this.props.currentUser && this.props.currentUser.state || null} onChange={this.handleChange} required />
              </InputGroup>
            </Col>

            <Col>
              <InputGroup className="mb-3">
                <FormControl id="zip_code" value={this.props.currentUser && this.props.currentUser.zip_code || null} onChange={this.handleChange} required />
              </InputGroup>
            </Col>
          </Row>


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
