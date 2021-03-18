import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import history from './pages/history.js';
import { Router, Switch, Route } from 'react-router-dom';
import Main from './pages/main';
ReactDOM.render(
      <Router history={history}>
      <Switch>
        <Route path="/" component={Main} exact={true} />
        </Switch>
      </Router>,
  document.getElementById('rootc')
);