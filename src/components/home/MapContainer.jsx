import React from 'react';
import {connect} from 'react-redux';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import places from '../firebaseData.js';


class MapContainer extends React.Component {

    renderHome() {
        const style = { display: 'inline-block', margin: '0 16% 0 0', height:'600px' }

        return (

            <div >

                <Map style={style} google={this.props.google}
                     initialCenter={{
                         lat: 54.5039043,
                         lng: 18.3934396
                     }}
                     zoom={10}
                >

                    <Marker name={'Sea Towers'}
                            position={{lat: 54.5222336, lng: 18.5515414}} >

                    </Marker>

                    <Marker name={'Muzeum miasta Gdyni'}
                            position={{lat: 54.515825, lng: 18.5449753}}>
                    </Marker>

                    <Marker name={'Okręt wojskowy ORP Błyskawica'}
                            position={{lat: 54.5195615, lng: 18.5489877}}>
                    </Marker>

                </Map>
            </div>

        );
    };

    render() {
        return this.renderHome();
    }
}

//export default MapContainer;


export default GoogleApiWrapper({
    apiKey: ' GOOGLE_API_KEY'
})(MapContainer)

