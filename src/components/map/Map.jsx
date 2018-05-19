import React from 'react';
import * as _ from "lodash";
import {connect} from 'react-redux';
import {selectPlace} from '../../redux/modules/cardlist/actions';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import GoogleMapReact from 'google-map-react';

export class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMarker: null,
      center: {
        lat: 54.439444,
        lng: 18.5721789,
      },
      zoom: 11,
    }
  }

  componentWillMount() {
    const {selectedPlace} = this.props;
    if (selectedPlace) {
      const newCenter = {
        lat: parseFloat(selectedPlace.lat),
        lng: parseFloat(selectedPlace.lon),
      };
      this.setState({activeMarker: selectedPlace, center: newCenter, zoom: 14});
      this.props.selectPlace(null);
    }
  }

  manageActive = (place) => this.setState({activeMarker: place});

  renderMarkerPopup(place) {
    const {activeMarker} = this.state;
    place = activeMarker;
    const markerPopup = document.getElementById('marker-popup');
    console.log(markerPopup);
    if (markerPopup) {
      console.log(markerPopup.clientHeight);
      console.log(markerPopup.clientWidth);
    }
    let currentDisplay = 'block';
    if (!place.display) {
      place = {...place, display: 'block'};
      setTimeout(() => this.setState({activeMarker: place}), 0);
    }
    else {
      currentDisplay = 'block';
    }
    return (
      <div id="marker-popup" style={{display: currentDisplay}}>
        <div className='title'>
          {place.name}
          <span className="close" onClick={this.manageActive}>
            x
          </span>
        </div>
        <div className='description'>
          <div className='photo'>
            <img
              alt="obrazek"
              src={place.img}
              width={'100%'}
              height={'100%'}
            />
          </div>
          <div className='text'>
            {place.description}
          </div>
        </div>
      </div>
    )
  }

  renderMarker = (place) => {
    const {activeMarker} = this.state;
    const isActive = activeMarker && place.id === activeMarker.id;
    return (
      <div
        key={place.id}
        lat={place.lat}
        lng={place.lon}
        className="marker-container"
      >
        {isActive && this.renderMarkerPopup(place)}
        <img
          alt="marker"
          className="marker"
          src="imgs/marker.png"
          onClick={() => this.manageActive(place)}
        />
      </div>
    );
  };

  render() {
    const {places} = this.props;
    if (!places) {
      return (
        <RefreshIndicator
          size={100}
          left={70}
          top={0}
          loadingColor="black"
          status="loading"
          style={{
            display: 'inline-block',
            position: 'relative',
            margin: '18% 0 0 45%',
          }}
        />
      );
    }
    const {center, zoom} = this.state;
    const markers = _.map(places, this.renderMarker);
    return (
      <div style={{width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0}}>
        <GoogleMapReact
          // apiKey={null}
          bootstrapURLKeys={{key: process.env.MAP_KEY}}
          center={center}
          zoom={zoom}
        >
          {markers}
        </GoogleMapReact>
      </div>
    )
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
