import React from 'react';
import firebase from './config/config.js';
import Login from './Login';
import {Route, Link} from 'react-router-dom';
import Success from './Success';
import Map from './Map';
// import { compose, withStateHandlers } from "recompose";
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

// const MyMapComponent = compose(
//   withStateHandlers(() => ({
//       isMarkerShown: false,
//       markerPosition: null,
//       latFrom: null,
//       lngFrom: null
//     }), {
//       onMapClick: () => (e) => ({
//           markerPosition: e.latLng,
//           isMarkerShown: true,
//           latFrom: e.latLng.lat(),
//           lngFrom: e.latLng.lng(),
//       })
//     }),
//   withScriptjs,
//   withGoogleMap
// )((props) =>
//   <GoogleMap
//     defaultZoom={8}
//     defaultCenter={{ lat: 42.882004, lng: 74.582748 }}
//     onClick={props.onMapClick}
//   >
//   {props.isMarkerShown &&
//   <Marker position={ props.markerPosition } />}
//   </GoogleMap>
// )

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     date: new Date(),
     description: '',
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
  // handleMarkerClick = (e) => { 
  //       console.log('map clicked');
  //       const latitude = e.latLng.lat();
  //       const longitude = e.latLng.lng();
  //       console.log(latitude + ", " + longitude);
  //       this.setState({
  //         latFrom : latitude,
  //         lngForm : longitude,
  //         isMarkerShown : true
  //       })
  // }
  updateFromCoors = (coord) => {
    this.setState({
      latFrom: coord.lat(),
      lngFrom: coord.lng()
    });
    console.log(this.state.latFrom + '.' + this.state.lngFrom);
  }
  updateToCoors = (coord) => {
    this.setState({
      latTo: coord.lat(),
      lngTo: coord.lng()
    });
    console.log(this.state.latTo + '.' + this.state.lngTo);
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
    if(this.state.latFrom){
    db.collection("orders").add({
      date: this.state.date,
      description: this.state.description,
      latFrom: this.state.latFrom,
      lngFrom: this.state.lngFrom,
      latTo: this.state.latTo,
      lngTo: this.state.lngTo,
      status: true
  }).then(() => {
    this.setState({
    date: new Date(),
    description: '',
     });
     window.location="/success"
    })}
    else {
      alert("Необходимо указать точки на карте !!!")
    }
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
          {/* <MyMapComponent
            isMarkerShown={this.state.isMarkerShown}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAOVn6OX9UpmqamEuoWZmUrEhn8hC1wO8E"
            loadingElement={<div style={{height: `100%`}}/>}
            containerElement={<div style={{height: `400px`}}/>}
            onMapClick={this.handleMarkerClick}
            mapElement={<div style={{height: `100%`}}/>}
          /> */}
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