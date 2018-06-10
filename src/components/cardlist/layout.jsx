import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import * as _ from 'lodash';
import {connect} from 'react-redux';
import {
  createComment,
  fetchGeo,
  findPlace,
  rate,
  removeComment,
  removePlace,
  selectPlace,
} from '../../redux/modules/cardlist/actions';
import {history} from '../../prepare';
import Autocomplete from 'react-google-autocomplete';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {calculateDistance} from '../utils';
import StarRatings from 'react-star-ratings';
import {Dialog, TextField} from "material-ui";
import {LoginRegisterDialog} from "../login_register/index"
import CancelIcon from 'material-ui/svg-icons/navigation/cancel';

class PlaceList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      commentToShow: null,
      add: false,
      title: '',
      description: '',
      popup: false,
    }
  }

  componentWillMount() {
    this.props.fetchGeo();
  }

  handlePopup = () => this.setState({popup: !this.state.popup});

  handleOpen = (place) => this.setState({commentToShow: place});

  handleClose = () => this.setState({commentToShow: null, title: '', description: '', add: false});

  calculateRating = (place) => {
    const {ratings} = this.props;
    if (!ratings || !ratings[place.id]) {
      return 0;
    }
    const rates = _.map(ratings[place.id], (value) => value);
    return rates.reduce((a, b) => a + b) / rates.length;
  };

  rate = (rating, place) => {
    this.props.rate(rating, place);
  };

  deletePlace = (place) => {
    if (confirm(`Napewno usunąć ${place.name}?`)) {
      this.props.removePlace(place);
    }
  };

  renderPlace(place) {
    const link = "https://www.google.com/maps/?q=" + place.lat + "," + place.lon;
    const placeRating = this.calculateRating(place).toFixed(2);
    const {ratings, user, admins} = this.props;
    return (
      <div className="cards" key={place.name}>
        <div className="cardList">
          <div style={{display: 'flex'}}>
            <h1>{place.name}</h1>
            {admins && user && admins[user.uid] &&
            <div style={{flex: 1, cursor: 'pointer'}} onClick={() => this.deletePlace(place)}>
              <CancelIcon color="red"/>
            </div>}
          </div>
          <div className="cardContainer">
            <div className="cardImage">
              <img src={place.img} alt={place.name}/>
            </div>
            <div className="pAndButtons">
              <p>{place.description}</p>
              <div className="buttons">
                <FlatButton className="cardButton" label="Zobacz na mapie" href={link} target="blank"/>
                <FlatButton className="cardButton" label="Wyswietl lokacje" onClick={() => {
                  history.push('/');
                  this.props.selectPlace(place);
                }}/>
                <FlatButton className="cardButton" label="Komentarze" onClick={() => {
                  this.handleOpen(place);
                }}/>
              </div>
              {place.distance && <p>Odległość: {place.distance.toFixed(2)} km</p>}
            </div>
          </div>
          <h3
            style={{marginBottom: 0}}>{placeRating !== '0.00' ? `Ocena użytkowników: ${placeRating}` : 'Brak ocen'}</h3>
          {user && <h3 style={{margin: '0 auto'}}>Twoja ocena:</h3>}
          {user && <div>
            <StarRatings
              rating={ratings[place.id] && ratings[place.id][user.uid] ? ratings[place.id][user.uid] : 0}
              starRatedColor="#ebf21d"
              starSelectingHoverColor="#00C1D8"
              isSelectable={true}
              isAggregateRating={false}
              changeRating={(rating) => this.rate(rating, place)}
              numOfStars={5}
            />
          </div>}
        </div>
      </div>
    );
  }

  renderComments(placeID) {
    const {comments} = this.props;
    let commentsToShow = comments[placeID] ? [...comments[placeID]] : [];
    if (this.state.add) {
      commentsToShow.push({add: true});
    }
    return (
      <div>
        {!comments[placeID] &&
        <div className="comment">
          <h3>Brak komentarzy</h3>
        </div>}
        {commentsToShow.length > 0 && _.map(commentsToShow, (comment) => this.renderComment(comment))}
      </div>
    );
  }

  deleteComment = (comment) => {
    if (confirm(`Napewno usunąć ten komentarz?`)) {
      this.props.removeComment(comment);
    }
  };

  renderComment(comment) {
    if (comment.add) {
      return (
        <div key="add" className="comment">
          <h1>Nowy komentarz</h1>
          <h3 style={{border: 0}}>
            <TextField
              hintText="Tytuł"
              onChange={(e) => this.setState({title: e.target.value})}
              value={this.state.title}
              inputStyle={{width: '100%', textAlign: 'center'}}
              hintStyle={{width: '100%', textAlign: 'center'}}
              style={{width: '100%'}}
            />
          </h3>
          <p style={{display: 'flex', justifyContent: 'center'}}>
            <TextField
              hintText="Treść"
              inputStyle={{width: '100%', textAlign: 'center'}}
              hintStyle={{width: '100%', textAlign: 'center'}}
              style={{width: '100%', textAlign: 'center'}}
              onChange={(e) => this.setState({description: e.target.value})}
              value={this.state.description}
            />
          </p>
          <FlatButton style={{width: '100%'}} onClick={this.sendComment}>Dodaj</FlatButton>
        </div>
      );
    }
    const {admins, user} = this.props;
    return (
      <div key={comment.id} className="comment">
        <div style={{display: 'flex'}}>
          <h1 style={{flex: 28, paddingBottom: 5}}>
            {comment.title}
          </h1>
          {((admins && user && admins[user.uid]) || (user && comment.user && comment.user === user.uid)) &&
          <div
            style={{flex: 1, cursor: 'pointer', marginTop: 10}}
            onClick={() => this.deleteComment(comment)}
          >
            <CancelIcon color="red"/>
          </div>}
        </div>
        {/*<p className="username">Username</p>*/}
        <p>{comment.content}</p>
      </div>
    );
  }

  sendComment = () => {
    this.setState({add: false, title: '', description: ''});
    this.props.createComment(this.state.title, this.state.description, this.state.commentToShow.id);
  };

  addComment = () => {
    if (this.props.user) {
      return this.setState({add: true});
    }
    this.handlePopup();
  };

  renderList() {
    const {places, queryPlace, geolocate} = this.props;
    let placesToRender = [...places];
    if (queryPlace) {
      _.forEach(placesToRender, (place, index) => {
          return placesToRender[index] = {
            ...place,
            distance: calculateDistance(queryPlace, {lat: place.lat, lon: place.lon})
          }
        }
      );
      placesToRender.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    }
    else if (geolocate) {
      _.forEach(placesToRender, (place, index) => {
          return placesToRender[index] = {
            ...place,
            distance: calculateDistance(geolocate, {lat: place.lat, lon: place.lon})
          }
        }
      );
      placesToRender.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    }
    return _.map(placesToRender, (place) => this.renderPlace(place));
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  renderSearchBar() {
    return (
      <form className="cards" onSubmit={this.handleFormSubmit}>
        <Autocomplete
          onPlaceSelected={(placeToFind) => placeToFind.geometry && this.props.findPlace(placeToFind)}
          types={['geocode']}
          componentRestrictions={{country: "pl"}}
          placeholder="Szukaj"
        />
      </form>
    );
  }

  renderDialog() {
    const {commentToShow} = this.state;
    return (
      <Dialog
        style={{height: '100%'}}
        modal={false}
        open={true}
        onRequestClose={this.handleClose}
        autoScrollBodyContent={true}
        className="commentDialog"
        contentClassName="dialog-content"
        paperClassName="dialog-paper"
      >
        <FlatButton
          label="Cofnij"
          fullWidth
          primary
          onClick={this.handleClose}
          className="dialog-back"
        />
        <div className="commentBox">
          <h1 className="commentTitle">
            Komentarze dla {commentToShow.name}
          </h1>
          <FlatButton className="addCommentButton" label={"Dodaj komentarz"} onClick={this.addComment}/>
        </div>
        {this.renderComments(commentToShow.id)}
      </Dialog>
    );
  }

  render() {
    const style = {
      container: {
        position: 'relative',
      },
      refresh: {
        display: 'inline-block',
        position: 'relative',
        margin: '18% 0 0 45%',
      },
    };
    if (!this.props.places || !this.props.ratings) {
      return <RefreshIndicator
        size={100}
        left={70}
        top={0}
        loadingColor="black"
        status="loading"
        style={style.refresh}
      />
    }
    return (<div>
      {this.state.commentToShow && this.renderDialog()}
      {this.renderSearchBar()}
      {this.renderList()}
      <LoginRegisterDialog popup={this.state.popup} callback={this.handlePopup}/>
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    admins: state.auth.admins,
    places: state.map.places,
    queryPlace: state.cardList.queryPlace,
    geolocate: state.cardList.geolocate,
    comments: state.cardList.comments,
    ratings: state.cardList.ratings,
  };
}

const mapDispatchToProps = {
  selectPlace,
  findPlace,
  fetchGeo,
  rate,
  createComment,
  removePlace,
  removeComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceList);