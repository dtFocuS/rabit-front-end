import React, { Component } from 'react';
import { Modal, Button,InputGroup, FormControl, Form, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Route, withRouter } from 'react-router-dom';


class SignupForm extends Component {

    constructor(props) {
        super(props);
        this.username = React.createRef()
    		this.password = React.createRef()
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

    getToken(jwt) {
        return localStorage.getItem('jwt')
    }

    saveToken(jwt) {
        localStorage.setItem('jwt', jwt)
    }


    createUser = () => {
      fetch('http://localhost:3000/api/v1/users', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( {
            user: {
              name: this.state.name,
              username: this.state.username,
              password: this.state.password,
              address: this.state.address,
              city: this.state.city,
              state: this.state.state,
              zip_code: this.state.zip_code
            }
          }
        )
      })
      .then(resp => resp.json())
      .then(json => {
        this.setState({ user: json.user }, () => {
          this.loginNewUser()
        })
      })
    }

    loginNewUser = () => {
        let username = this.state.username;
        let password = this.state.password;
        console.log(username);
        console.log(password);
        fetch('http://localhost:3000/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: { username, password } })
        })
        .then(res => res.json())
        .then(json => {
            if (json && json.jwt) {
                this.saveToken(json.jwt)
                this.props.getUser()
            }
        })
        .then(() => {
    			this.props.history.push('/')
    		})
    }


    handleSubmit = (ev) => {
      ev.preventDefault();
      if (!ev.target.checkValidity() || this.state.confirm !== this.state.password) {
        this.setState({ displayErrors: true });
        return;
      } else {
        this.setState({ displayErrors: false });
        this.props.onHide();
        this.createUser(this.state);
      }
    }

    handleChange = (ev) => {
      this.setState({
        [ev.target.id]: ev.target.value
      })
    }



  render() {
    const { displayErrors } = this.state;
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
            <Form onSubmit={this.handleSubmit} className={displayErrors ? 'displayErrors' : ''} noValidate>
            <Row>
              <Col>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1"> </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    type="text" id="name" placeholder="Name" onChange={this.handleChange} required
                  />
                </InputGroup>
              </Col>
              <Col>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    type="text" id="username" placeholder="username" required onChange={this.handleChange}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <InputGroup className="mb-3">
                  <FormControl placeholder="Password"
                  type="password" id="password" onChange={this.handleChange} required />
                </InputGroup>
              </Col>

              <Col>
                <InputGroup className="mb-3">
                  <FormControl type="password" id="confirm" placeholder="Confirm" onChange={this.handleChange} required />
                </InputGroup>
              </Col>
            </Row>
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
                  <FormControl id="zip_code" placeholder="Zip Code" onChange={this.handleChange} required />
                </InputGroup>
              </Col>
            </Row>


              <Button type="submit" className="modal-buttons" onClick={this.handleClick}>Create Account</Button>
            </Form>
          </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    );
  }
}

export default withRouter(SignupForm);
