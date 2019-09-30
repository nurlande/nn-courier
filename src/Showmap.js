import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

class Showmap extends React.Component {

  render() {
    return (
        <div>
        <Map
          google={this.props.google}
          zoom={this.props.zoom}
          style={{width: '100%', height: '200px'}}
          initialCenter={this.props.center}
          mapTypeControl = {false}
          streetViewControl = {false}
        >
        <Marker
            position={{ lat: this.props.latFrom, lng: this.props.lngFrom }}
            label='B'
        />
        <Marker
            position={{ lat: this.props.latTo, lng: this.props.lngTo }}
            label='A'
        />
        </Map>
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAOVn6OX9UpmqamEuoWZmUrEhn8hC1wO8E",
  libraries: []
})(Showmap);
