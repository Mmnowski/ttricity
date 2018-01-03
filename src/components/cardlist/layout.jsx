import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';
import {connect} from 'react-redux';
import {findPlace, selectPlace, test, createComment} from '../../redux/modules/cardlist/actions';
import {history} from '../../prepare';
import Autocomplete from 'react-google-autocomplete';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {calculateDistance} from '../utils';
import {Dialog, TextField} from "material-ui";

class PlaceList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      commentToShow: null,
      add: false,
      title: '',
      description: '',
    }
  }

  componentWillMount() {
    this.props.test();
  }

  handleOpen = (place) => {
    this.setState({commentToShow: place});
  };

  handleClose = () => {
    this.setState({commentToShow: null});
  };

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
                <FlatButton className="cardButton" label="Komentarze" onClick={() => {
                  this.handleOpen(place);
                }}/>
              </div>
              {place.distance && <p>{place.distance.toFixed(2)} km</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderComments(placeID) {
    const {comments} = this.props;
    if (!comments[placeID]) {
      return (
        <div className="comment">
          <h3>Brak komentarzy</h3>
        </div>
      );
    }
    let commentsToShow = [...comments[placeID]];
    if (this.state.add) {
      commentsToShow.push({add: true});
    }
    return (
      <div>
        {_.map(commentsToShow, (comment) => this.renderComment(comment))}
      </div>
    );
  }

  renderComment(comment) {
    console.log(comment)
    if (comment.add) {
      return (
        <div key="add" className="comment">
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
          <FlatButton style={{width: '100%'}} onClick={this.sendComment}>ADD</FlatButton>
        </div>
      );
    }
    return (
      <div key={comment.title} className="comment">
        <h3>{comment.title}</h3>
        {/*tutaj hardcoded username*/}
        <p className="username">Username</p>
        <p>{comment.content}</p>
      </div>
    );
  }

  sendComment = () => {
    this.setState({add: false});
    this.props.createComment(this.state.title, this.state.description, this.state.commentToShow.id);
  };

  addComment = () => {
    if(!this.props.user){

        this.setState({add: true});
    }
  };

  renderList() {
    const {places, queryPlace} = this.props;
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
    return _.map(placesToRender, (place) => this.element(place));
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

  renderDialog() {
    const {commentToShow} = this.state;
    return (
      <Dialog
        title={
          <div className="commentBox">
            <h1 className="commentTitle">
              Komentarze dla {commentToShow.name}
            </h1>
            <FlatButton className="addCommentButton" label={this.props.user ? "Dodaj komentarz" : "Zaloguj się"} onClick={this.addComment}/>
          </div>
        }
        modal={false}
        open={true}
        onRequestClose={this.handleClose}
        autoScrollBodyContent={true}
        className="commentDialog"
      >
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
    if (!this.props.places) {
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
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    places: state.map.places,
    queryPlace: state.cardList.queryPlace,
    comments: state.cardList.comments,
  };
}

const mapDispatchToProps = {
  selectPlace,
  findPlace,
  test,
    createComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceList);