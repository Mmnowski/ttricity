import React from 'react';
import './layout.scss';
import NavBar from './navBar';
import {connect} from 'react-redux';
import {fetchAdmins} from '../redux/modules/auth/actions';
import {fetchPlaces} from '../redux/modules/map/actions';
import {fetchComments, fetchRatings} from '../redux/modules/cardlist/actions';
import {GoogleApiWrapper} from 'google-maps-react';
import {MAP_KEY} from '../../secret';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false,
    };
  }

  componentWillMount() {
    this.props.fetchPlaces();
    this.props.fetchComments();
    this.props.fetchRatings();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.user && this.props.user !== newProps.user) {
      this.props.fetchAdmins();
    }
  }

  render() {
    let children = this.props.children;
    return (
      <div className="main-container">
        <section className="content-container">
          {children}
        </section>
        <div className="navbar-container">
          <NavBar/>
        </div>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

const mapDispatchToProps = {
  fetchPlaces,
  fetchComments,
  fetchRatings,
  fetchAdmins,
};

const LayoutAPI = GoogleApiWrapper({apiKey: MAP_KEY})(Layout);

export default connect(mapStateToProps, mapDispatchToProps)(LayoutAPI);
