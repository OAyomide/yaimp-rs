import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './views/Home'
import Fib from './views/Fib'

import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Intro from './views/Intro';
import Editor from './views/Editor';

const routes = (
  <Router>
    <div>
      <Route path="/" component={Home} exact />
      <Route path="/fib" component={Fib} />
      <Route path="/intro" component={Intro} />
      <Route path="/editor" component={Editor} />
    </div>
  </Router>
)
ReactDOM.render(routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
