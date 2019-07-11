import React, { Component } from 'react';
import '../../index.css';
import { Modal, Button, Form, InputGroup, FormControl, Row, Col } from 'react-bootstrap';


class EditTaskForm extends Component {

  constructor(props) {
    super(props);
    let hour = this.props.task.completed_by.split(":")[0];
    let minsWithAP = this.props.task.completed_by.split(":")[1];
    let mins = minsWithAP.split(" ")[0];
    let ap = minsWithAP.split(" ")[1];
    this.state = {
      name: this.props.task.name,
      description: this.props.task.description,
      address: this.props.task.address,
      city: this.props.task.city,
      state: this.props.task.state,
      zip_code: this.props.task.zip_code,
      prefer_cost: this.props.task.prefer_cost,
      hours: hour,
      minutes: mins,
      ampm: ap,
      task_id: this.props.task.id

    }
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
      this.props.onEditTask(this.state);
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
              Edit Task
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={this.handleSubmit} className={displayErrors ? 'displayErrors' : ''} noValidate>
            <InputGroup className="mb-3">
              <FormControl id="name" placeholder="Title" onChange={this.handleChange} value={this.state.name}/>
            </InputGroup>

            <InputGroup className="mb-3">
              <FormControl id="address" placeholder="Address" onChange={this.handleChange} value={this.state.address} required />
            </InputGroup>
            <Row>
              <Col>
                <InputGroup className="mb-3">
                  <FormControl id="city" placeholder="City" onChange={this.handleChange} value={this.state.city} required />
                </InputGroup>
              </Col>

              <Col>
                <InputGroup className="mb-3">
                  <FormControl id="state" placeholder="State" onChange={this.handleChange} value={this.state.state} required />
                </InputGroup>
              </Col>

              <Col>
                <InputGroup className="mb-3">
                  <FormControl id="zip_code" placeholder="Zip Code" onChange={this.handleChange} value={this.state.zip_code} required />
                </InputGroup>
              </Col>
            </Row>

            <InputGroup>
              <FormControl id="description" placeholder="Description" onChange={this.handleChange} value={this.state.description} required as="textarea" aria-label="With textarea" />
            </InputGroup>

            <br/>
            <br/>
            <h6>Prefered Time</h6>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridState">

                <Form.Control as="select" value={this.state.hour} id="hours" onChange={this.handleChange}>
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

                <Form.Control as="select" value={this.state.mins} id="minutes" onChange={this.handleChange}>
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

                <Form.Control as="select" value={this.state.ampm} id="ampm" onChange={this.handleChange}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>

              <FormControl type="number" id="prefer_cost" placeholder="Amount" onChange={this.handleChange} value={this.state.prefer_cost} required />
            </InputGroup>

            <Button type="submit" className="modal-buttons" onClick={this.handleClick}>Submit</Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>
        </Modal.Footer>

      </Modal>
    );
  }
}

export default EditTaskForm;
