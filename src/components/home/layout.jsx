import React from 'react';
import Home from './MapContainer';

class HomeLayout extends React.Component {
  renderHome() {
    return (
      <div>
        <h1>Witamy na TurystyczneTriCity!</h1>
        <Home/>
      </div>
    );
  };

  render() {
    return this.renderHome();
  }
}

export default HomeLayout;
