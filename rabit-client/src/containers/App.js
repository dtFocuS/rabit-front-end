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
            user_id: null,
            user: null
        }
    }

    getCurrentUser = (userInfo) => {
        console.log(userInfo.user.id)
        this.setState({
            user_id: userInfo.user.id,
            user: userInfo.user
        }, () => {console.log(this.state.user_id)})
    }

    render() {

        return(
            <Router>
                <React.Fragment>
                    <Header />
                    <Route exact path="/" render={routerProps => <Home {...routerProps} currentUserId={this.state.user_id}/>} />
                    <Route exact path="/login" render={routerProps => <Login {...routerProps} onGetUser={this.getCurrentUser}/>} />
                    <Route exact path="/account" component={Account} />
                </React.Fragment>
            </Router>

        );
    }
}

export default App;
