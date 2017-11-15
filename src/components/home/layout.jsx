import React from 'react';
import Map from './MapContainer';

class HomeLayout extends React.Component {
  renderHome() {
    return (
      <div className="map-container">
        <Map/>
      </div>
    );
  };

  render() {
    return this.renderHome();
  }
}

export default HomeLayout;
