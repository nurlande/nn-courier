import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Header from './Header';
import Order from './Order';
import Orderlist from './Orderlist';
import App from './App';
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
      <div>
          <Header />
        <ul className="navbar container">
          <li>
            <Link className="nav-item" to="/">Home</Link>
          </li>
          <li>
            <Link className="nav-item" to="/order">Order</Link>
          </li>
          <li>
            <Link  className="nav-item" to="/orderlist">Orderlist</Link>
          </li>
        </ul>
        <Route exact path="/" component={App} />
        <Route path="/order" component={Order} />
        <Route path="/orderlist" component={Orderlist} />
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();