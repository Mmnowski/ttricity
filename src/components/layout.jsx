import React from 'react';
import './layout.scss';
import NavBar from './navBar';
import {connect} from 'react-redux';
import {fetchPlaces} from '../redux/modules/map/actions';

let MediaQuery = require('react-responsive');

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false,
    };
  }

  componentWillMount() {
    this.props.fetchPlaces();
  }

  mediaCheck() {
    return (
      <MediaQuery minDeviceWidth={1300}>
        {(matches) => {
          if (matches) {
            if (this.state.mobile) {
              this.setState({mobile: false});
            }
          } else {
            if (!this.state.mobile) {
              this.setState({mobile: true});
            }
          }
          return (null);
        }}
      </MediaQuery>
    );
  };

  render() {
    // _.map(places, (place) => console.log(place));
    let children = this.props.children;
    let shouldOpen = this.props.open;
    // if (!this.props.isLogged) {
    //   if (children.props.location.pathname !== '/') {
    //     history.replace('/');
    //     children = null;
    //   }
    //   shouldOpen = false;
    // }
    let navWidth = shouldOpen && !this.state.mobile ? '88.5%' : '100%';
    return (
      <div className="main-container">
        <section className="content-container">
          {children}
        </section>
        <div className="navbar-container">
          <NavBar/>
        </div>
        {/*{this.mediaCheck()}*/}
      </div>
    );
  };
}

const mapDispatchToProps = {
  fetchPlaces,
};

export default connect(null, mapDispatchToProps)(Layout);
