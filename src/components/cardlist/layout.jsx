import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';
import {connect} from 'react-redux';
import {selectPlace} from '../../redux/modules/cardlist/actions';
import {history} from '../../prepare';


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
                <FlatButton className="cardButton" label="Wyswietl" onClick={() =>
                {
                  history.push('/');
                  this.props.selectPlace(place);
                }}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderList() {
    return _.map(this.props.places, (place) => this.element(place));
  }

  render() {
    if (!this.props.places) {
      return <h1>Pobieranie danych...</h1>
    }
    return (<div>
      {this.renderList()}
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    places: state.map.places,
  };
}

const mapDispatchToProps = {
  selectPlace,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceList);