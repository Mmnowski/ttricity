import React from 'react';
import MapContainer from './MapContainer';

class HomeLayout extends React.Component {
  renderHome() {
    return (
      <div>
        <h1>Witamy na TurystyczneTriCity!</h1>
        <MapContainer />
      </div>
    );
  };

  render() {
    return this.renderHome();
  }
}

export default HomeLayout;
