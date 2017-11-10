import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {places} from '../firebaseData.js';
import _ from 'lodash';
import {connect} from 'react-redux';
import {selectPlace} from '../../redux/modules/cardlist/actions';



class PlaceList extends React.Component {

  constructor(props) {
    super(props);
  }

  element(place) {
    const link = "https://www.google.com/maps/?q=" + place.lat + "," + place.lon;
    return (
      <div className="cardList" key={place.name}>
        <h1>{place.name}</h1>
        <div className="cardContainer">
        <div className="cardImage">
          <img src={place.img} alt={place.name}/>
        </div>
          <div className="pAndButtons">
            <p>{place.description}</p>
            <div className="buttons">
              <FlatButton label="Zobacz na mapie" href={link} target="blank"/>
              <FlatButton label="Wyswietl" onClick={() => this.props.selectPlace(place)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderList() {
    return _.map(places, (place) => this.element(place));
  }

  render() {
    return (<div>
      {this.renderList()}
    </div>);
  }
}

const mapDispatchToProps = {
  selectPlace,
};

export default connect(null, mapDispatchToProps)(PlaceList);