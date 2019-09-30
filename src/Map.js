import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const MarkersList = props => {
  const { locations, ...markerProps } = props;
  return (
    <span>
      {locations.map((location, i) => {
        return (
          <Marker
            key={i}
            {...markerProps}
            position={{ lat: location.lat(), lng: location.lng() }}
            
          />
        );
      })}
    </span>
  );
};

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: []
    };
    this.handleMapClick = this.handleMapClick.bind(this);
  }

  handleMapClick = (ref, map, ev) => {
    const location = ev.latLng;
    if (this.state.locations.length < 2) {
    this.setState(prevState => ({
      locations: [...prevState.locations, location]
    }))
    this.props.updateFromCoors(location);
  }};
  resetMarkers = (e) => {
      e.preventDefault();
      this.setState ({
          locations : []
      })
      this.props.resetCoors();
  }

  render() {
    return (
        <div>
            <button onClick={this.resetMarkers}>Reset Markers</button>
        <Map
          google={this.props.google}
          zoom={this.props.zoom}
          style={{width: '100%', height: '300px'}}
          initialCenter={this.props.center}
          onClick={this.handleMapClick}
        >
         <MarkersList locations={this.state.locations} />
        </Map>
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAOVn6OX9UpmqamEuoWZmUrEhn8hC1wO8E",
  libraries: []
})(MapContainer);
