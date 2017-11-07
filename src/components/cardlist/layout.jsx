import React from 'react';
import {Card, CardActions, CardText, CardHeader} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import {places} from '../firebaseData.js';
import _ from 'lodash';
class PlaceList extends React.Component {
  constructor(props){
    super(props);
  }

  element(place) {
    const link = "https://www.google.com/maps/?q="+place.lat+","+place.lon;
    const style ={
      width: "100px",
      height: '100px'
    }
    return (
      <div key={place.name}>
        <Card>
          <CardHeader
            title={place.name}
            avatar={<Avatar src={place.img} size={100}/>}
          />
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