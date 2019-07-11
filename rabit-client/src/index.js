import React from 'react';
import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.css';
import App from './containers/App';
// import Header from './components/Header'

// import Home from './components/Home';
// import Login from './components/Login';
// import Account from './components/Account';

import * as serviceWorker from './serviceWorker';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
