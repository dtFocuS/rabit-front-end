import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import Header from '../components/Header'

import Home from '../components/Home';
import Login from '../components/Login';
import Account from '../components/Account';
import Open from '../components/Open';

// import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';


class App extends Component {

    constructor() {
        super();
        this.state = {
            user: null,
            user_id: null,
            userTasks: []
        }
    }

    getToken(jwt) {
        return localStorage.getItem('jwt')
    }

    getUser = () => {
      let token = this.getToken()
      fetch('http://localhost:3000/api/v1/profile', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(res => res.json())
      .then(json => {
        if (json.user) {
          this.setState( { user: json.user, user_id: json.user.id }, () => {
            this.loadTasks()
          })
        }
      })
    }



    createTask = (newTask) => {
        const time = newTask.hours + ":" + newTask.minutes + " " + newTask.ampm;
        console.log(time);
        const dollarAmount = parseFloat(newTask.prefer_cost).toFixed(2);
        fetch("http://localhost:3000/api/v1/tasks", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ task: { name: newTask.name, description: newTask.description, address: newTask.address, city: newTask.city, state: newTask.state, zip_code: parseInt(newTask.zip_code), prefer_cost: dollarAmount, completed_by: time, user_id: this.state.user.id} })
        })
        .then(resp => resp.json())
        .then(task => {
            console.log(task)
            this.setState({userTasks: this.state.user.tasks}, () => {this.getUser()})
        })
    }

    loadTasks = () => {
      if (this.state.user) {
        let temp = this.state.user.tasks.slice().reverse();
        this.setState({
            userTasks: temp
        })
      }
    }

    editTask = (newTask) => {
        console.log(newTask);
        const time = newTask.hours + ":" + newTask.minutes + " " + newTask.ampm;
        console.log(time);
        const dollarAmount = parseFloat(newTask.prefer_cost).toFixed(2);
        fetch("http://localhost:3000/api/v1/tasks/" + newTask.task_id, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: { name: newTask.name, description: newTask.description, address: newTask.address, city: newTask.city, state: newTask.state, zip_code: parseInt(newTask.zip_code), prefer_cost: dollarAmount, completed_by: time, user_id: this.state.user.id } })
        })
        .then(resp => resp.json())
        .then(task => {
            this.getUser()
        })
    }

    componentDidMount() {
      this.getUser()
    }


    render() {


        return(
            <Router>
                <React.Fragment>

                    <Header user={this.state.user}/>

                    <Route exact path="/" render={routerProps => <Home {...routerProps} createTask={this.createTask} userTasks={this.state.userTasks} onEditTask={this.editTask} user={this.state.user}/>} />

                    <Route exact path="/login" render={routerProps => <Login {...routerProps} getUser={this.getUser} onHandleCreate={this.createUser} user={this.state.user} handleLogout={this.logout}/>} />

                    <Route exact path="/account" render={routerProps => <Account {...routerProps} createTask={this.createTask} userTasks={this.state.userTasks} onEditTask={this.editTask} user={this.state.user}/>} />

                    <Route exact path="/open" render={routerProps => <Open {...routerProps} user={this.state.user}/>} />

                </React.Fragment>
            </Router>

        );
    }
}

export default App;
