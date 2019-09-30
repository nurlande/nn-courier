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
            label={i===0 ? "A" : "B"}
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
    switch (this.state.locations.length) {
        case 0:
            this.setState(prevState => ({
            locations: [...prevState.locations, location]
            }))
            this.props.updateFromCoors(location);
            break;
        case 1:
            this.setState(prevState => ({
            locations: [...prevState.locations, location]
            }))
            this.props.updateToCoors(location);
            break;
        default:
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
        <div className="text-right">
            <button onClick={this.resetMarkers} className="btn btn-danger reset">Убрать флажки</button>
        <Map
          google={this.props.google}
          zoom={this.props.zoom}
          style={{width: '100%', height: '300px'}}
          initialCenter={this.props.center}
          mapTypeControl = {false}
          streetViewControl = {false}
          onClick={this.handleMapClick}
        >
         <MarkersList locations={this.state.locations}/>
        </Map>
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAOVn6OX9UpmqamEuoWZmUrEhn8hC1wO8E",
  libraries: []
})(MapContainer);
