import React from 'react';
import firebase from './config/config.js';
import Login from './Login';
import {Route, Link} from 'react-router-dom';
import Success from './Success';
import Map from './Map';

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     date: new Date(),
     description: undefined,
     user: null,
     isMarkerShown: false,
     latFrom: null,
     lngFrom: null,
     latTo: null,
     lngTo: null
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
  updateFromCoors = (coord) => {
    this.setState({
      latFrom: coord.lat(),
      lngFrom: coord.lng()
    })
  }
  updateToCoors = (coord) => {
    this.setState({
      latTo: coord.lat(),
      lngTo: coord.lng()
    })
  }
  resetCoors = () => {
    this.setState({
      latFrom: null,
      lngFrom: null,
      latTo: null,
      lngTo: null
    })
  }
  addPost = (e) => {
    e.preventDefault();
    const db = firebase.firestore();
    if(this.state.description === undefined) {
      alert("Необходимо заполнить все поля !!!");
      return;
    }
    if(this.state.latFrom === null || this.state.latTo===null) {
      alert("Необходимо указать точки на карте !!!");
      return;
    }
    db.collection("orders").add({
      date: this.state.date,
      description: this.state.description,
      latFrom: this.state.latFrom,
      lngFrom: this.state.lngFrom,
      latTo: this.state.latTo,
      lngTo: this.state.lngTo,
      status: true
  }).then(() => {
     window.location="/success"
    })
  };
  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
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
        <h1>Вызов курьера</h1>
        <form onSubmit={this.addPost} className="form text-left">
          <div>
            <label><b>Дата Отправки:</b></label> <br />
          <input
            type="date"
            name="date"
            placeholder="Дата"
            onChange={this.updateInput}
            value={this.state.date}
            className="input"
          />
          </div>
          <label><b>Описание посылки:</b></label> <br />
          <input
            type="text"
            name="description"
            placeholder="Описание"
            onChange={this.updateInput}
            value={this.state.description}
            className="input"
          />
          <br />
          <br />
          <label><b>Виберите точки отправки и доставки на карте: </b><i>А и B</i></label>
          <div className="here-map">
          <Map center={{ lat: 42.882004, lng: 74.582748}} zoom={10}
            updateFromCoors={this.updateFromCoors}
            updateToCoors={this.updateToCoors}
            resetCoors={this.resetCoors}
          />
          </div>
          <br />
          <button type="submit" className="btn btn-primary btn-block">Submit</button>
        </form>
        </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-lg choose">Перейти к логин</Link>
        )}
        <Route path="/login" component={Login}/>
        <Route path="/success" component={Success}/>
    </div>
    );
  }
}

export default Order;