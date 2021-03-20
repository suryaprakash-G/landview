import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import history from './pages/history.js';
import AdminLogin from './pages/adminlogin';
import Newlnd from './pages/newlnd';
import { Router, Switch, Route } from 'react-router-dom';
import Main from './pages/main';
ReactDOM.render(
      <Router history={history}>
      <Switch>
        <Route path="/" component={Main} exact={true} />
        <Route path="/admin" component={AdminLogin} exact={true}/>
        <Route path="/new" component={Newlnd} exact={true}/>
        </Switch>
      </Router>,
  document.getElementById('rootc')
);