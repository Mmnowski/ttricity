import React from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import {places} from '../firebaseData.js';


export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }

  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }


  MarkerRender() {

    return _.map(places, (place) => {
      return (
        <Marker key={place.name} name={place.name} onClick={this.onMarkerClick}
                position={{lat: place.lat, lng: place.lon}}/>
      )
    });
  }


  render() {
    const style = {display: 'inline-block', width: '74%', height: '600px'};
    return (
        <Map style={style} google={this.props.google}
             initialCenter={{
               lat: 54.5039043,
               lng: 18.3934396
             }}
             zoom={10}>

          {this.MarkerRender()}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name} </h1>
            </div>
          </InfoWindow>
        </Map>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: ' GOOGLE_API_KEY'
})(MapContainer)

