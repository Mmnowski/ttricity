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


        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
        });
    }



    render(){
        const style = { display: 'inline-block',width: '74%', height:'600px' }

        return (
            <Map style={style} google={this.props.google}
                 initialCenter={{
                     lat: 54.5039043,
                     lng: 18.3934396
                 }}
                 zoom={10}
            >

                <Marker name={places[1].name} onClick={this.onMarkerClick}
                        position={{lat: places[1].lat, lng: places[1].lon}} />

            <Marker name={places[2].name} onClick={this.onMarkerClick}
                        position={{lat: places[2].lat, lng: places[2].lon}} />

                <Marker name={places[3].name} onClick={this.onMarkerClick}
                        position={{lat: places[3].lat, lng: places[3].lon}} />




                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name} </h1>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}


export default GoogleApiWrapper({
    apiKey: ' GOOGLE_API_KEY'
})(MapContainer)

