import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Header from './Header/Header'

import Home from './Home/Home';
import Login from './Login/Login';
import Account from './Account/Account';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

ReactDOM.render((
  <Router>
    <React.Fragment>
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/account" component={Account} />
    </React.Fragment>
  </Router>),
  document.getElementById('root')
);

serviceWorker.unregister();
