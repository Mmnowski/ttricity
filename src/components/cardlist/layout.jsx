import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {places} from '../firebaseData.js';
import _ from 'lodash';
import {CardMedia} from "material-ui";

class PlaceList extends React.Component {
  constructor(props) {
    super(props);
  }

  element(place) {
    const link = "https://www.google.com/maps/?q=" + place.lat + "," + place.lon;
    return (
      <div key={place.name}>
        <Card>
          <CardHeader
            title={place.name}
          />
          <CardMedia>
            <div className="card-media">
              <img style={{objectFit: 'contain'}} src={place.img} alt={place.name}/>
            </div>
          </CardMedia>
          <CardActions>
            <FlatButton label="Zobacz na mapie" href={link} target="blank"/>
          </CardActions>
          <CardText expandable={false}>
            {place.description}
          </CardText>
        </Card>
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

export default PlaceList;