import React from 'react';
import {Link} from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {connect} from 'react-redux';
import {clearAuthError, loginUser, logoutUser, registerUser} from "../redux/modules/auth/actions";
import Dialog from 'material-ui/Dialog';
import {FlatButton, TextField} from "material-ui";
import {Tab, Tabs} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import './layout.scss';
import {LoginRegisterDialog} from "../components/login_register/index";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      email: '',
      email_register: '',
      password1: '',
      password2: '',
      password: '',
      slideIndex: 0,
      error: '',
      open: true,
    };
  }

  componentWillMount() {
    this.props.clearAuthError();
  }

  loginButton() {
    if (this.props.user) {
      return (
        <MenuItem
          onClick={(e) => {
            e.preventDefault();
            this.props.logoutUser();
          }}
        >
          Wyloguj
        </MenuItem>
      )
    }
    return (
      <MenuItem
        onClick={this.handlePopup}
      >
        Logowanie
      </MenuItem>
    );
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handlePopup = () => this.setState({popup: !this.state.popup});

  render() {
    return (
      <div>
        <Drawer open={this.state.open} containerStyle={{width: '12%', height: '60vh', top: '10vh'}}>
          <MenuItem
            containerElement={<Link to="/"/>}
            primaryText="Strona główna"
          />
          <MenuItem
            containerElement={<Link to="/lista"/>}
            primaryText="Lista lokacji"
          />
            {this.loginButton()}
        </Drawer>
        <LoginRegisterDialog popup = {this.state.popup} callback = {this.handlePopup}/>
        <img src='imgs/templogo.png' className="logo" onClick={this.handleToggle}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    error: state.auth.error,
    email: state.auth.email,
  };
};

const mapDispatchToProps = {
  clearAuthError,
  loginUser,
  logoutUser,
  registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
