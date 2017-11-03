import React from 'react';
import './layout.scss';
import {history} from '../prepare';
import AppBar from 'material-ui/AppBar';

let MediaQuery = require('react-responsive');

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false,
    };
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
    if (!this.props.isLogged) {
      if (children.props.location.pathname !== '/') {
        history.replace('/');
        children = null;
      }
      shouldOpen = false;
    }
    let navWidth = shouldOpen && !this.state.mobile ? '88.5%' : '100%';
    return (
      <div className="container">
        <AppBar
    title="Title"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
        <section className="content" style={{width: navWidth}}>
          {children}
        </section>
        <footer>
        </footer>
        {/*{this.mediaCheck()}*/}
      </div>
    );
  };
}

export default Layout;
