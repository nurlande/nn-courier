import React from 'react';
import firebase from './config/config.js';
import Login from './Login';
import {Route, Link} from 'react-router-dom';

class Order extends React.Component {
  constructor() {
    super();
    this.state = {
     date: '',
     description: '',
     geoLocationFrom: '',
     geoLocationTo: '',
     user: null
    };
    this.authListener = this.authListener.bind(this);
  }
  componentDidMount() {
    this.authListener();
  }
  updateInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  addPost = (e) => {
    e.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection("orders").add({
      date: this.state.date,
      description: this.state.description,
      geoLocationFrom: this.state.geoLocationFrom,
      geoLocationTo: this.state.geoLocationTo,
      status: true
  });
    this.setState({
      date: '',
      description: '',
      geoLocationFrom: '',
      geoLocationTo: ''
    });
    alert("The request has been allowed");
  };
  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }
  render() {
    return (
    <div className="text-center">
        {this.state.user ? (
        <div className="order">
        <h1>Order</h1>
        <form onSubmit={this.addPost}
              className="form"
              >
          <input
            type="text"
            name="date"
            placeholder="Дата"
            onChange={this.updateInput}
            value={this.state.date}
            className="input"
          />
          <br />
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={this.updateInput}
            value={this.state.description}
            className="input"
          />
          <br />
          <input
            type="text"
            name="geoLocationFrom"
            placeholder="From"
            onChange={this.updateInput}
            value={this.state.geoLocationFrom}
            className="input"
          />
                    <input
            type="text"
            name="geoLocationTo"
            placeholder="To"
            onChange={this.updateInput}
            value={this.state.geoLocationTo}
            className="input"
          />
          <br />
        <br />
          <button type="submit" className="btn btn-success btn-block">Submit</button>
        </form>
        </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-lg choose">Go to Login</Link>
        )}
        <Route path="/login" component={Login}/>
    </div>
    );
  }
}

export default Order;