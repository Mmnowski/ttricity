import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';
import {connect} from 'react-redux';
import {findPlace, selectPlace} from '../../redux/modules/cardlist/actions';
import {history} from '../../prepare';
import Autocomplete from 'react-google-autocomplete';
import {calculateDistance} from '../utils';


class PlaceList extends React.Component {

  constructor(props) {
    super(props);
  }

  element(place) {
    const link = "https://www.google.com/maps/?q=" + place.lat + "," + place.lon;
    return (
      <div className="cards" key={place.name}>
        <div className="cardList">
          <h1>{place.name}</h1>
          <div className="cardContainer">
            <div className="cardImage">
              <img src={place.img} alt={place.name}/>
            </div>
            <div className="pAndButtons">
              <p>{place.description}</p>
              <div className="buttons">
                <FlatButton className="cardButton" label="Zobacz na mapie" href={link} target="blank"/>
                <FlatButton className="cardButton" label="Wyswietl" onClick={() => {
                  history.push('/');
                  this.props.selectPlace(place);
                }}/>
              </div>
              {place.distance && <p>{place.distance.toFixed(2)} km</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderList() {
    const {places, queryPlace} = this.props;
    if (queryPlace) {
      _.forEach(places, (place, index) => {
          return places[index] = {...place, distance: calculateDistance(queryPlace, {lat: place.lat, lon: place.lon})}
        }
      );
      _.sortBy(places, ['distance']);
    }
    return _.map(places, (place) => this.element(place));
  }

  renderSearchBar() {
    return (
      <form className="cards">
        <Autocomplete
          onPlaceSelected={(placeToFind) => {
            this.props.findPlace(placeToFind);
          }}
          types={['geocode']}
          componentRestrictions={{country: "pl"}}
          placeholder="Szukaj"
        />
      </form>
    );
  }

  render() {
    if (!this.props.places) {
      return <h1>Pobieranie danych...</h1>
    }
    return (<div>
      {this.renderSearchBar()}
      {this.renderList()}
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    places: state.map.places,
    queryPlace: state.cardList.queryPlace,
  };
}

const mapDispatchToProps = {
  selectPlace,
  findPlace,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceList);