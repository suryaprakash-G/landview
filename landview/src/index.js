import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import history from './pages/history';
import { Router, Switch, Route } from 'react-router-dom';
//import * as serviceWorker from './serviceWorker';

ReactDOM.render(
      <Router history={history}>
      <Switch>
        <Route path="/" component={Main} exact={true} />
        </Switch>
      </Router>,
  document.getElementById('rootc')
);