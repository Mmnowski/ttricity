import React from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker,} from 'google-maps-react';
import * as _ from "lodash";
import {connect} from 'react-redux';
import {selectPlace} from '../../redux/modules/cardlist/actions';
import {saveMarker} from '../../redux/modules/map/actions';
import RefreshIndicator from 'material-ui/RefreshIndicator';
const cycle = require('../cycle');

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
    console.log(newProps.marker, 'MARKER');
    if (newProps.selectedPlace && newProps.marker) {
      let marker = newProps.marker;
      marker.position.lat = () => newProps.selectedPlace.lat;
      marker.position.lng = () => newProps.selectedPlace.lon;
      this.setState({
        selectedPlace: newProps.selectedPlace,
        activeMarker: marker,
        showingInfoWindow: true,
      });
      this.props.selectPlace(null);
    }
  }

  onMarkerClick = (props, marker, e) => {
    // console.log(JSON.stringify(JSON.decycle(marker)));
    // console.log(marker);
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

  render() {
    const style1 = {
      container: {
        position: 'relative',
      },
      refresh: {
        display: 'inline-block',
        position: 'relative',
        margin: '18% 0 0 45%',
      },
    };
    if (!this.props.places) {
      return <RefreshIndicator
        size={100}
        left={70}
        top={0}
        loadingColor="black"
        status="loading"
        style={style1.refresh}
      />
    }
    const {activeMarker, selectedPlace, showingInfoWindow} = this.state;
    const style = {display: 'inline-block', width: '100%', height: '100%'};
    return (
      <Map style={style} google={window.google}
           initialCenter={{
             lat: 54.439444,
             lng: 18.5721789,
           }}
           zoom={11}>
        {_.map(this.props.places, (place) => this.renderMarker(place))}
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
    places: state.map.places,
  };
}

const mapDispatchToProps = {
  selectPlace,
  saveMarker,
};

// Doubles it's fine xD
const MapComponent = GoogleApiWrapper({
  apiKey: 'GOOGLE_API_KEY',
})(MapContainer);

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
