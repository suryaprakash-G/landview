import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import history from './pages/history.js';
import AdminLogin from './pages/adminlogin.js';
import Newlnd from './pages/newlnd.js';
import {HashRouter as Router, Route,Switch} from "react-router-dom";
import Main from './pages/main';
import Details from './pages/details';
ReactDOM.render(
      <Router history={history}>
      <Switch>
        <Route path="/" component={Main} exact={true} />
        <Route path="/admin" component={AdminLogin} exact={true}/>
        <Route path="/new" component={Newlnd} exact={true}/>
        <Route path="/details" component={Details} exact={true}/>
        </Switch>
      </Router>,
  document.getElementById('rootc')
);