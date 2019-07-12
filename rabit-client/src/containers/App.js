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
            userTasks: [],
            otherTasks:[],
            bidTasks: []
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
            this.setState({
                userTasks: this.state.user.tasks
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

    loadOtherTasks = () => {
        fetch('http://localhost:3000/api/v1/tasks')
        .then(resp => resp.json())
        .then(tasks => this.filterOtherTasks(tasks))
    }

    filterOtherTasks = (tasks) => {
        if (this.state.user) {
            let temp = tasks.slice();
            const filteredTasks = temp.filter(task => task.user_id !== this.state.user.id)
            this.setState({
                otherTasks: filteredTasks
            }, () => { this.loadUserBids();})
        }
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
            this.setState({ user: json.user}, () => {this.loadUserTasks()})
        })
    }

    saveToken(jwt) {
        localStorage.setItem('jwt', jwt)
    }

    getToken(jwt) {
        return localStorage.getItem('jwt')
    }

    loadUserTasks = () => {
      if (this.state.user) {
        let temp = this.state.user.tasks.slice().reverse();
        this.setState({
            userTasks: temp
        }, () => {this.loadOtherTasks()})
      }
    }


    handleCreate = (newUser) => {
        let password = newUser.password;
        fetch('http://localhost:3000/api/v1/users', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: { name: newUser.name, username: newUser.username, password: newUser.password, address: newUser.address, city: newUser.city, state: newUser.state, zip_code: newUser.zip_code } })
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

    placeBid = (newBid) => {
        console.log(newBid);
        const dollarAmount = parseFloat(newBid.amount).toFixed(2);
        fetch("http://localhost:3000/api/v1/bids", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bid: { amount: dollarAmount, eta: newBid.eta, user_id: this.state.user.id, task_id: newBid.task_id } })
        })
        .then(resp => resp.json())
        .then(bid => {
            this.loadUserBids();
        })
    }

    loadUserBids = () => {
        fetch("http://localhost:3000/api/v1/bids")
        .then(resp => resp.json())
        .then(bids => {
            console.log("load bids")
            this.filterBids(bids);
        })
    }

    filterBids = (bids) => {
        console.log(this.state.user)
        if (this.state.user) {
            //let temp = bids.slice();
            const filteredBids = bids.filter(bid => bid.user_id === this.state.user.id)
            this.findMyBidTasks(filteredBids);
        }
    }

    findMyBidTasks = (filteredBids) => {
        console.log(filteredBids)
        if (this.state.otherTasks) {
            const taskIds = filteredBids.map(bid => bid.task_id);
            console.log(taskIds)
            let temp = [];
            for (let i = 0; i < taskIds.length; i++) {
                for (const task of this.state.otherTasks) {
                    if (task.id === taskIds[i]) {
                        temp.push(task);
                    }
                }
            }
            this.setState({
                bidTasks: temp
            }, () => {console.log(this.state.bidTasks)})
        }
    }


    render() {

        return(
            <Router>
                <React.Fragment>

                    <Header currentUser={this.state.user}/>
                    <Route exact path="/" render={routerProps => <Home {...routerProps} onCreateTask={this.createTask} userTasks={this.state.userTasks} onEditTask={this.editTask} currentUser={this.state.user} otherTasks={this.state.otherTasks} placeBid={this.placeBid} bidTasks={this.state.bidTasks}/>} />

                    <Route exact path="/login" render={routerProps => <Login {...routerProps} onGetCurrentUser={this.getCurrentUser} onGetProfile={this.getProfile} onHandleCreate={this.handleCreate} currentUser={this.state.user} handleLogout={this.logout}/>} />
                    <Route exact path="/account" render={routerProps => <Account {...routerProps} onCreateTask={this.createTask} userTasks={this.state.userTasks} onEditTask={this.editTask} currentUser={this.state.user}/>} />
                    <Route exact path="/open" render={routerProps => <Open {...routerProps} currentUser={this.state.user}/>} />
                </React.Fragment>
            </Router>

        );
    }
}

export default App;
