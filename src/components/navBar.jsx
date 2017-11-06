import React from 'react';
import { Link } from 'react-router';
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
        <MenuItem
          containerElement={<Link to="/" />}
          primaryText="Strona główna"
        />
        <MenuItem
          containerElement={<Link to="/lista" />}
          primaryText="Lista lokacji"
        />
      </Drawer>
    );
  }
}

export default NavBar;
