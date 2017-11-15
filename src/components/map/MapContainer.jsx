import React from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import {places} from '../firebaseData.js';
import * as _ from "lodash";
import {connect} from 'react-redux';
import {selectPlace} from '../../redux/modules/cardlist/actions';


export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.selectedPlace) {
      // this.setState({
      //   selectedPlace: newProps.selectedPlace,
      //   activeMarker: marker,
      //   showingInfoWindow: true,
      // });
      this.props.selectPlace(null);
    }
  }

  onMarkerClick = (props, marker, e) => {
    console.log(marker);
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

  test() {
    if (!this.props.selectedPlace) {
      return console.log('Nic nie wybrales.');
    }
    return (console.log('W zakladce Lista atrakcji wybrales : ' + this.props.selectedPlace.name));
  }


  render() {
    this.test();
    const style = {display: 'inline-block', width: '100%', height: '100%'};
    return (
      <Map style={style} google={this.props.google}
           initialCenter={{
             lat: 54.439444,
             lng: 18.5721789,
           }}
           zoom={11}>
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

function mapStateToProps(state) {
  return {
    selectedPlace: state.cardList.activePlace
  };
}

const mapDispatchToProps = {
  selectPlace,
};

const MapWrapper = GoogleApiWrapper({
  apiKey: ' GOOGLE_API_KEY'
})(MapContainer);

export default connect(mapStateToProps,mapDispatchToProps)(MapWrapper);


