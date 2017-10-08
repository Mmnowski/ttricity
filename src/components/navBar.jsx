import React from 'react';
import './layout.scss';
import {Link} from 'react-router';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  navList() {
    return (
      <ul>
        <li><Link to="/">Homepage</Link></li>
      </ul>
    );
  }

  render() {
    return (
      <header style={{width: '15vh'}}>
        {this.navList()}
      </header>
    );
  }
}

export default NavBar;
