import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import Header from '../components/Header'

import Home from '../components/Home';
import Login from '../components/Login';
import Account from '../components/Account';
import Open from '../components/Open';

// import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const URL = "https://rabit-backend.herokuapp.com/";
const localHost = "http://localhost:3000/";


class App extends Component {

    constructor() {
        super();
        this.state = {
            user: null,
            user_id: null,
            userTasks: [],
            otherTasks:[],
            bidTasks: [],
            allTasks: []
        }
    }

    getToken(jwt) {
        return localStorage.getItem('jwt')
    }

    getUser = () => {
      let token = this.getToken()
      fetch(URL + 'api/v1/profile', {
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
        fetch(URL + "api/v1/tasks", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ task: { name: newTask.name, description: newTask.description, address: newTask.address, city: newTask.city, state: newTask.state, zip_code: parseInt(newTask.zip_code), prefer_cost: dollarAmount, completed_by: time, user_id: this.state.user.id} })
        })
        .then(resp => resp.json())
        .then(task => {

            this.setState({userTasks: this.state.user.tasks}, () => {
              this.getUser()
            })
        })
    }





    loadOtherTasks = () => {
        fetch(URL + 'api/v1/tasks')
        .then(resp => resp.json())
        .then(tasks => this.filterOtherTasks(tasks))
    }

    filterOtherTasks = (tasks) => {
        if (this.state.user) {
            let temp = tasks.slice();
            const filteredTasks = temp.filter(task => task.user_id !== this.state.user.id)
            console.log(filteredTasks)
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
        fetch(URL + "api/v1/tasks/" + newTask.task_id, {
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
      this.loadAllTasks();
      //this.loadUserBids();
    }

    loadAllTasks = () => {
        fetch(URL + "api/v1/tasks")
        .then(resp => resp.json())
        .then(json => {
            this.setState({
                allTasks: json
            })
        })
    }


    placeBid = (newBid) => {

        const dollarAmount = parseFloat(newBid.amount).toFixed(2);
        fetch(URL + "api/v1/bids", {
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

        // fetch("api/v1/bids")
        // .then(resp => resp.json())
        // .then(bids => {

        // fetch("api/v1/bids")
        // .then(resp => resp.json())
        // .then(bids => {

        //     this.filterBids(bids);
        // })

        // this.setState({
        //     bidTasks: this.state.user.bids
        // }, () => { this.removeFromAvailableTasks()})
    // }


        //     this.filterBids(bids);
        // })
        if (this.state.user) {
            const bids = this.state.user.bids;
            const array = this.state.allTasks.filter(task => task.user_id !== this.state.user.id);
            let temp = [];
            for(let i = 0; i < bids.length; i ++) {
                for (const task of array) {
                    if (bids[i].task_id === task.id) {
                        temp.push(task);
                    }
                }
            }
            console.log(temp)
            this.setState({
                bidTasks: temp
            }, () => { this.removeFromAvailableTasks() })
        }
        
    }

    // filterBids = (bids) => {
    //     if (this.state.user) {
    //         //let temp = bids.slice();
    //         const filteredBids = bids.filter(bid => bid.user_id === this.state.user.id)
    //         this.findMyBidTasks(filteredBids);
    //     }
    // }

    // findMyBidTasks = (filteredBids) => {
    //     //if (this.state.otherTasks) {
    //         const taskIds = filteredBids.map(bid => bid.task_id);
    //         const otherUserTasks = this.state.allTasks.filter(task => task.id !== this.state.user.id)
    //         let temp = [];
    //         for (let i = 0; i < taskIds.length; i++) {
    //             for (const task of otherUserTasks) {
    //                 if (task.id === taskIds[i]) {
    //                     temp.push(task);
    //                 }
    //             }
    //         }
    //         this.setState({
    //             bidTasks: temp
    //         }, () => {this.removeFromAvailableTasks()})
    //     //}
    // }

    removeFromAvailableTasks = () => {
        //let array = this.state.otherTasks.slice();
        //let array = this.state.otherTasks.slice();
        const array = this.state.allTasks.filter(task => task.user_id !== this.state.user.id);
        console.log(this.state.otherTasks)
        //const array = otherUserTasks
        for (let i = 0; i < this.state.bidTasks.length; i ++) {
            var index = array.indexOf(this.state.bidTasks[i]);
            if (index > -1) {
                array.splice(index, 1);
            }
        }
        this.setState({
            otherTasks: array
        }, () => {console.log('temp')})

    }

    removeTask = (task) => {
        // console.log(task);
        fetch(URL + "api/v1/tasks/" + task.id, {
            method: "DELETE",
        })
        .then(resp => resp.json())
        .then(json => {
            this.getUser();
        })
    }

    removeBid = (task) => {
        const removingBid = this.state.bidTasks.filter(bidTask => bidTask.id === task.id);
        const  bidIds = task.bids.filter(bid => bid.user_id === this.state.user.id)
        console.log(bidIds)
        fetch(URL + "api/v1/bids/" + bidIds[0].id, {
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

                    <Route exact path="/login" render={routerProps => <Login {...routerProps} getUser={this.getUser} onHandleCreate={this.createUser} user={this.state.user} handleLogout={this.logout}/>} />

                    <Route exact path="/account" render={routerProps => <Account {...routerProps} onCreateTask={this.createTask} userTasks={this.state.userTasks} onEditTask={this.editTask} user={this.state.user}/>} />

                    <Route exact path="/open" render={routerProps => <Open {...routerProps} user={this.state.user}/>} />


                </React.Fragment>
            </Router>

        );
    }
}

export default App;
