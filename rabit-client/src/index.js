import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Header from './components/Header'

import Home from './components/Home';
import Login from './components/Login';
import Account from './components/Account';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
