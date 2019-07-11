import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import Header from '../components/Header'

import Home from '../components/Home';
import Login from '../components/Login';
import Account from '../components/Account';

// import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';


class App extends Component {

    constructor() {
        super();
        this.state = {
            user: null,
            user_id: null
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

    componentWillMount() {
        this.getProfile();
    }

    // getUserToken = () => {
    //     return localStorage.getItem('jwt');
    // }

    // state = {
    //     user: null,
    //     username: null
    // }

    // constructor() {
    //     super()
    //     this.username = React.createRef()
    //     this.password = React.createRef()

    //     if (this.getToken()) {
    //         this.getProfile()
    //     }

    //     this.logout = this.logout.bind(this)
    // }

    // login = (event) => {
    //     event.preventDefault()
    //     console.log('log in')
    //     let username = event.target[0].value
    //     let password = event.target[1].value

    //     fetch('http://localhost:3000/api/v1/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ user: { username, password } })
    //     })
    //         .then(res => res.json())
    //         .then(json => {
    //             console.log('login:', json)
    //             if (json && json.jwt) {
    //                 this.saveToken(json.jwt)
    //                 this.getProfile()
    //             }
    //         })
    //         .then(() => {
    //             this.props.history.push('/')
    //         })
    // }

    logout = () => {
        //this.clearToken();
        this.setState({
            user: null
        })
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
            this.setState({ user: json.user }, () => {console.log(this.state.user)})
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

    render() {

        return(
            <Router>
                <React.Fragment>
                    <Header currentUser={this.state.user}/>
                    <Route exact path="/" render={routerProps => <Home {...routerProps} />} currentUser={this.state.user} />
                    <Route exact path="/login" render={routerProps => <Login {...routerProps} onGetCurrentUser={this.getCurrentUser} onGetProfile={this.getProfile} onHandleCreate={this.handleCreate} currentUser={this.state.user} handleLogout={this.logout}/>} />
                    <Route exact path="/account" render={routerProps => <Account {...routerProps} currentUser={this.state.user}/>} />
                </React.Fragment>
            </Router>

        );
    }
}

export default App;
