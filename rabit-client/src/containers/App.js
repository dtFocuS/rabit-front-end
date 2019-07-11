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
        //this.getProfile = this.getProfile.bind(this)
    }

    getCurrentUser = (userInfo) => {
        console.log(userInfo.user.id)
        this.setState({
            user_id: userInfo.user.id,
            user: userInfo.user
        }, () => {console.log(this.state.user_id)})
    }

    // componentWillMount() {
    //     this.getProfile();
    // }


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
            this.setState(prevState => {
                userTasks: prevState.userTasks.push(task)
            }, () => {this.getProfile()})
        })
    }

    logout = () => {
        //this.clearToken();
        this.setState({
            user: null
        })
    }

    componentDidMount() {
        this.getProfile()
    }

    getProfile = () => {
        let token = this.getToken()
        fetch('http://localhost:3000/api/v1/profile', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => res.json())
        .then(json => {
            console.log('profile:', json)
            this.setState({ user: json.user, userTasks: json.user.tasks}, () => {console.log(this.state.userTasks)})
        })
    }

    saveToken(jwt) {
        localStorage.setItem('jwt', jwt)
    }

    // clearToken(jwt) {
    //     localStorage.setItem('jwt', '')
    // }

    getToken(jwt) {
        return localStorage.getItem('jwt')
    }


    handleCreate = (newUser) => {
        let password = newUser.password;
        fetch('http://localhost:3000/api/v1/users', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: { ...newUser } })
        })
        .then(resp => resp.json())
        .then(json => { this.setState({ user: json.user}, () => {this.loginNewUser(password)}) })

    }

    loginNewUser = (password) => {
        let username = this.state.user.username;
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
            console.log('login:', json)
            if (json && json.jwt) {
                this.saveToken(json.jwt)
                this.getProfile()
            }
        })
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
            console.log(task)
            this.getProfile() 
        })

    }

    render() {

        return(
            <Router>
                <React.Fragment>

                    <Header currentUser={this.state.user}/>
                    <Route exact path="/" render={routerProps => <Home {...routerProps} onCreateTask={this.createTask} userTasks={this.state.userTasks} onEditTask={this.editTask} currentUser={this.state.user}/>} />

                    <Route exact path="/login" render={routerProps => <Login {...routerProps} onGetCurrentUser={this.getCurrentUser} onGetProfile={this.getProfile} onHandleCreate={this.handleCreate} currentUser={this.state.user} handleLogout={this.logout}/>} />
                    <Route exact path="/account" render={routerProps => <Account {...routerProps} onCreateTask={this.createTask} userTasks={this.state.userTasks} onEditTask={this.editTask} currentUser={this.state.user}/>} />
                    <Route exact path="/open" render={routerProps => <Open {...routerProps} currentUser={this.state.user}/>} />
                </React.Fragment>
            </Router>

        );
    }
}

export default App;
