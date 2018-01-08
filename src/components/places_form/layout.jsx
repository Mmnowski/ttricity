import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import {TextField} from "material-ui";
import {history} from '../../prepare';
import {createPlace} from "../../redux/modules/places_form/actions";

class PlacesForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      desc: "",
      img: "",
      lat: "",
      lon: "",
      name: "",
      descErrorText: "",
      imgErrorText: "",
      latErrorText: "",
      lonErrorText: "",
      nameErrorText: "",
    }
  }

  componentWillMount() {
    if (!this.props.user || !this.props.admins || !this.props.admins[this.props.user.uid]) {
      history.push('/');
    }
  }

  sendPlace = () => {
    let check = 0;
    const {desc, img, lat, lon, name} = this.state;

    if (desc === "") {
      check++;
      this.setState({descErrorText: "To pole jest obowiazkowe"});
    }
    if (img === "") {
      check++;
      this.setState({imgErrorText: "To pole jest obowiazkowe"});
    }
    if (lat === "") {
      check++;
      this.setState({latErrorText: "To pole jest obowiazkowe"});
    }
    if (lon === "") {
      check++;
      this.setState({lonErrorText: "To pole jest obowiazkowe"});
    }
    if (name === "") {
      check++;
      this.setState({nameErrorText: "To pole jest obowiazkowe"});
    }
    if (check === 0) {
      this.props.createPlace(desc, img, lat, lon, name);
      this.setState({desc: "", img: "", lat: "", lon: "", name: ""});
    }
  };

  render() {
    return (
      <div className="formBox">
        <div className="field">
          <TextField
            name="desc"
            value={this.state.desc}
            hintText="Opis"
            errorText={this.state.descErrorText}
            onChange={(e) => this.setState({desc: e.target.value, descErrorText: ""})}
          />
        </div>
        <div className="field">
          <TextField
            name="img"
            value={this.state.img}
            hintText="Link do zjęcia"
            errorText={this.state.imgErrorText}
            onChange={(e) => this.setState({img: e.target.value, imgErrorText: ""})}
          />
        </div>
        <div className="field">
          <TextField
            name="lat"
            value={this.state.lat}
            hintText="Lat"
            errorText={this.state.latErrorText}
            onChange={(e) => this.setState({lat: e.target.value, latErrorText: ""})}
          />
        </div>
        <div className="field">
          <TextField
            name="lon"
            value={this.state.lon}
            hintText="Lon"
            errorText={this.state.lonErrorText}
            onChange={(e) => this.setState({lon: e.target.value, lonErrorText: ""})}
          />
        </div>
        <div className="field">
          <TextField
            name="name"
            value={this.state.name}
            hintText="Nazwa"
            errorText={this.state.nameErrorText}
            onChange={(e) => this.setState({name: e.target.value, nameErrorText: ""})}
          />
        </div>
        <div className="sendButton">
          <FlatButton className="cardButton" label="Dodaj" onClick={this.sendPlace}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    admins: state.auth.admins,
  };
}

const mapDispatchToProps = {
  createPlace,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlacesForm);