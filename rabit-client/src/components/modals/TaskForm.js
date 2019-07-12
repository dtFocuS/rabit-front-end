import React, { Component } from 'react';
import { Modal, Button, Form, InputGroup, FormControl, Row, Col } from 'react-bootstrap';



class TaskForm extends Component {
  state = {
    hours: "12",
    minutes: "00",
    ampm: "AM"
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!event.target.checkValidity()) {
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
      console.log(event.target)
      console.log(event.target.value)
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
          <Form onSubmit={this.handleSubmit} className={displayErrors ? 'displayErrors' : ''} noValidate>
            <InputGroup className="mb-3">
              <FormControl id="name" placeholder="Title" onChange={this.handleChange} required/>
            </InputGroup>

            <InputGroup className="mb-3">
              <FormControl id="address" placeholder="Address" onChange={this.handleChange} required />
            </InputGroup>
            <Row>
              <Col>
                <InputGroup className="mb-3">
                  <FormControl id="city" placeholder="City" onChange={this.handleChange} required />
                </InputGroup>
              </Col>

              <Col>
                <InputGroup className="mb-3">
                  <FormControl id="state" placeholder="State" onChange={this.handleChange} required />
                </InputGroup>
              </Col>

              <Col>
                <InputGroup className="mb-3">
                  <FormControl type="number" id="zip_code" placeholder="Zip Code" onChange={this.handleChange} required />
                </InputGroup>
              </Col>
            </Row>

            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>

              <FormControl type="number" id="prefer_cost" placeholder="Amount" onChange={this.handleChange} required />
            </InputGroup>

            <InputGroup>
              <FormControl id="description" placeholder="Description" onChange={this.handleChange} as="textarea" aria-label="With textarea" required/>
            </InputGroup>

            <br/>
            <h6>Prefered Time</h6>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridState">

                <Form.Control as="select" id="hours" defaultValue="12" onChange={this.handleChange}>
                <option value="12">12</option>
                <option value="11">11</option>
                <option value="10">10</option>
                <option value="09">09</option>
                <option value="08">08</option>
                <option value="07">07</option>
                <option value="06">06</option>
                <option value="05">05</option>
                <option value="04">04</option>
                <option value="03">03</option>
                <option value="02">02</option>
                <option value="01">01</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">

                <Form.Control as="select" id="minutes" defaultValue="00" onChange={this.handleChange}>
                <option value="00">00</option>
                <option value="05">05</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
                <option value="35">35</option>
                <option value="40">40</option>
                <option value="45">45</option>
                <option value="50">50</option>
                <option value="55">55</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">

                <Form.Control as="select" id="ampm" defaultValue="AM" onChange={this.handleChange}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <br/>

            <Button type="submit" className="modal-buttons" onClick={this.handleClick}>Create</Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>
        </Modal.Footer>

      </Modal>
    );
  }


}


export default TaskForm;
