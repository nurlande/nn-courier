import React from 'react';
import firebase from './config/config.js';
import Login from './Login';
import {Route, Link} from 'react-router-dom';
import Success from './Success';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.latFrom, lng: props.lngFrom }} onClick={props.onMarkerClick}/>}
  </GoogleMap>
))

class Order extends React.Component {
  constructor() {
    super();
    this.state = {
     date: new Date(),
     description: '',
     user: null,
     isMarkerShown: true,
     latFrom: '',
     lngForm: ''
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
  handleMarkerClick = (e) => { 
    const latitude = e.latLng.lat(); 
    const longitude = e.latLng.lng(); 
    console.log(latitude + ", " + longitude);
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
      status: true
  }).then(() => {
    this.setState({
    date: new Date(),
    description: ''
     });
     window.location="/success"
    })
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
        <h1>Вызов курьера</h1>
        <form onSubmit={this.addPost} className="form text-left">
          <div>
            <label>Дата Отправки:</label>
          <input
            type="date"
            name="date"
            placeholder="Дата"
            onChange={this.updateInput}
            value={this.state.date}
            className="input"
          />
          </div>
          <br />
          <label>Описание:</label>
          <input
            type="text"
            name="description"
            placeholder="Описание"
            onChange={this.updateInput}
            value={this.state.description}
            className="input"
          />
          <br />
          <label>Точки отправки и доставки:</label>
          <div>
          <MyMapComponent
            isMarkerShown={this.state.isMarkerShown}
            onMarkerClick={this.handleMarkerClick}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
          </div>
          <br />
          <button type="submit" className="btn btn-success btn-block">Submit</button>
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