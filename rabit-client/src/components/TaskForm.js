import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';



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
        console.log(event.target.id)
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
                        <input type="text" id="prefer_cost" placeholder="Cost" onChange={this.handleChange} required/><br></br>
                        <label>Desired Completion Time:  </label>
                        <select id="hours" onChange={this.handleChange}>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12" selected>12</option>
                        </select>
                        <select id="minutes" onChange={this.handleChange}>
                            <option value="00" selected>00</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                        </select>
                        <select id="ampm" onChange={this.handleChange}>
                            <option value="AM" selected>AM</option>
                            <option value="PM">PM</option>
                        </select>
                        <Button type="submit">Create</Button>
                    </form>
                    

                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        );
    }


}


export default TaskForm;