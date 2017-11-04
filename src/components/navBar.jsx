import React from 'react';
import './layout.scss';
import {Link} from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: true};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        return (
            <div>
              <RaisedButton
                  label="Open menu"
                  onClick={this.handleToggle}
              />
              <Drawer open={this.state.open}>
                <MenuItem>Home</MenuItem>
                <MenuItem>Cards</MenuItem>
              </Drawer>
            </div>
        );
    }
}

export default NavBar;
