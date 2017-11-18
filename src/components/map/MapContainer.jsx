import React from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import {places} from '../firebaseData.js';
import * as _ from "lodash";
import {connect} from 'react-redux';
import {selectPlace} from '../../redux/modules/cardlist/actions';
import {saveMarker} from '../../redux/modules/map/actions';


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
      let marker = newProps.marker;
      marker.position.lat = () => newProps.selectedPlace.lat;
      marker.position.lng = () => newProps.selectedPlace.lon;
      this.setState({
        selectedPlace: newProps.selectedPlace,
        activeMarker: newProps.marker,
        showingInfoWindow: true,
      });
      this.props.selectPlace(null);
    }
  }

  onMarkerClick = (props, marker, e) => {
    console.log(marker);
    this.props.saveMarker(marker);
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
              img={place.img}
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
    const {activeMarker, selectedPlace, showingInfoWindow} = this.state;
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
          marker={activeMarker}
          visible={showingInfoWindow}>
          <div>
            <div className='title'>
              {selectedPlace.name}
            </div>
            <div className='description'>
              <div className='photo'>
                <img alt="obrazek" src={selectedPlace.img} width={'100%'} height={'100%'}/>
              </div>
              <div className='text'>
                {selectedPlace.description}
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
    selectedPlace: state.cardList.activePlace,
    marker: state.map.marker,
  };
}

const mapDispatchToProps = {
  selectPlace,
  saveMarker,
};

const MapWrapper = GoogleApiWrapper({
  apiKey: 'GOOGLE_API_KEY'
})(MapContainer);

export default connect(mapStateToProps, mapDispatchToProps)(MapWrapper);
