import React from 'react';
import {connect} from 'react-redux';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import places from '../firebaseData.js';


export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        }

        // binding this to event-handler functions
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }



    render(){
        const style = { display: 'inline-block', margin: '0 16% 0 0', height:'600px' }

        return (
            <Map style={style} google={this.props.google}
                 initialCenter={{
                     lat: 54.5039043,
                     lng: 18.3934396
                 }}
                 zoom={10}
            >


            <Marker name={'Muzeum miasta Gdyni'} onClick={this.onMarkerClick}
                        position={{lat: 54.515825, lng: 18.5449753}} />


                <Marker name={'Sea Towers'} onClick={this.onMarkerClick}
                        position={{lat: 54.5222336, lng: 18.5515414}} />



                <Marker name={'Okręt wojskowy ORP Błyskawica'} onClick={this.onMarkerClick}
                        position={{lat: 54.5195615, lng: 18.5489877}} />




                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}


export default GoogleApiWrapper({
    apiKey: ' GOOGLE_API_KEY'
})(MapContainer)

