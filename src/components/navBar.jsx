import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './layout.scss';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <Drawer open={this.state.open} containerStyle={{width: '17.6%', top: 8}}>
        {/*  <MenuItem
          containerElement={<Link to="/" />}
          primaryText="Test"
        />
        <MenuItem
          containerElement={<Link to="/lista" />}
          primaryText="Test2"
        />
       */}
        <MenuItem
          href="/#/"
          primaryText="Strona glowna"
        />
        <MenuItem
          href="/#/lista"
          primaryText="Lista atrakcji"
        />
      </Drawer>
    );
  }
}

export default NavBar;
