import React from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import {places} from '../firebaseData.js';
import * as _ from "lodash";
import {connect} from 'react-redux';


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
  };


  renderMarker(place) {
    return (
      <Marker key={place.name}
              name={place.name}
              description={place.description}
              photo={place.img}
              onClick={this.onMarkerClick}
              position={{lat: place.lat, lng: place.lon}}/>
    );
  }

  test(){
    if(!this.props.selectPlace){
      return console.log('Nic nie wybrales.');
    }
    return(console.log('W zakladce Lista atrakcji wybrales : ' + this.props.selectPlace.name));

  }


  render() {
    this.test()
    const style = {display: 'inline-block', width: '74%', height: '600px'};

    return (

      <Map style={style} google={this.props.google}
           initialCenter={{
             lat: 54.5039043,
             lng: 18.3934396
           }}
           zoom={10}>

        {_.map(places, (place) => this.renderMarker(place))}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>

          <div>

            <div className='title'>
              {this.state.selectedPlace.name}
            </div>
            <div className='description'>
              <div className='photo'>
                <img src={this.state.selectedPlace.photo} width={'100%'} height={'100%'}/>
              </div>
              <div className='text'>
                {this.state.selectedPlace.description}
              </div>
            </div>
          </div>
        </InfoWindow>

      </Map>
    );
  }
}

function mapStateToProps(state){
  return{
    selectPlace:state.cardList.activePlace
  };
}

const MapWrapper = GoogleApiWrapper({
  apiKey: ' GOOGLE_API_KEY'
})(MapContainer);

export default connect(mapStateToProps)(MapWrapper);


