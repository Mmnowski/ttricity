import React from 'react';
import {connect} from 'react-redux';

class Home extends React.Component {
  renderHome() {
    return (
      <div>
        <p>
          Turystyczne Tri City
        </p>
      </div>
    );
  };

  render() {
    return this.renderHome();
  }
}

export default Home;
