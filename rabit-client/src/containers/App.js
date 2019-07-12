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
            this.loadUserTasks()
          })
        }
      })
    }



    createTask = (newTask) => {
        const time = newTask.hours + ":" + newTask.minutes + " " + newTask.ampm;

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

            this.setState({userTasks: this.state.user.tasks}, () => {this.getUser()})
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

    editTask = (newTask) => {

        const time = newTask.hours + ":" + newTask.minutes + " " + newTask.ampm;

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


    placeBid = (newBid) => {

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

            this.filterBids(bids);
        })
        
        // this.setState({
        //     bidTasks: this.state.user.bids
        // }, () => { this.removeFromAvailableTasks()})
    }

    filterBids = (bids) => {
        if (this.state.user) {
            //let temp = bids.slice();
            const filteredBids = bids.filter(bid => bid.user_id === this.state.user.id)
            this.findMyBidTasks(filteredBids);
        }
    }

    findMyBidTasks = (filteredBids) => {
        if (this.state.otherTasks) {
            const taskIds = filteredBids.map(bid => bid.task_id);

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
            }, () => {this.removeFromAvailableTasks()})
        }
    }

    removeFromAvailableTasks = () => {
        let array = this.state.otherTasks.slice();
        for (let i = 0; i < this.state.bidTasks.length; i ++) {
            var index = array.indexOf(this.state.bidTasks[i]);
            if (index > -1) {
                array.splice(index, 1);
            }
        }
        this.setState({
            otherTasks: array
        })

    }

    removeTask = (task) => {
        // console.log(task);
        fetch("http://localhost:3000/api/v1/tasks/" + task.id, {
            method: "DELETE",
        })
        .then(resp => resp.json())
        .then(json => {
            this.getUser();
        })
    }

    removeBid = (task) => {
        const removingBid = this.state.bidTasks.filter(bidTask => bidTask.id === task.id);
        // console.log(removingBid[0].id);
        console.log(task)
        fetch("http://localhost:3000/api/v1/bids/" + removingBid[0].id, {
            method: "DELETE",
        })
        .then(resp => resp.json())
        .then(json => {
            this.getUser();
        })
    }



    render() {


        return(
            <Router>
                <React.Fragment>

                    <Header user={this.state.user} />
                    {/* <Header currentUser={this.state.user}/> */}
                    <Route exact path="/" render={routerProps => <Home {...routerProps} onCreateTask={this.createTask} userTasks={this.state.userTasks} onEditTask={this.editTask} user={this.state.user} otherTasks={this.state.otherTasks} placeBid={this.placeBid} bidTasks={this.state.bidTasks} onRemoveTask={this.removeTask} onRemoveBid={this.removeBid}/>} />



                    {/* <Route exact path="/" render={routerProps => <Home {...routerProps} createTask={this.createTask} userTasks={this.state.userTasks} onEditTask={this.editTask} user={this.state.user}/>} /> */}

                    <Route exact path="/login" render={routerProps => <Login {...routerProps} getUser={this.getUser} onHandleCreate={this.createUser} user={this.state.user} handleLogout={this.logout}/>} />

                    <Route exact path="/account" render={routerProps => <Account {...routerProps} onCreateTask={this.createTask} userTasks={this.state.userTasks} onEditTask={this.editTask} user={this.state.user}/>} />

                    <Route exact path="/open" render={routerProps => <Open {...routerProps} user={this.state.user}/>} />


                </React.Fragment>
            </Router>

        );
    }
}

export default App;
