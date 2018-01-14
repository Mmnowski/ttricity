import React from 'react';
import {Link} from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {connect} from 'react-redux';
import {clearAuthError, loginUser, logoutUser, registerUser} from "../redux/modules/auth/actions";
import LogoutIcon from 'material-ui/svg-icons/action/power-settings-new';
import './layout.scss';
import {LoginRegisterDialog} from "../components/login_register/index";

const drawerContainerStyle = {
  width: '211.1px',
  height: '60vh',
  bottom: 'unset',
  top: 'unset',
  position: 'unset',
};

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
            this.setState({popup: false});
            this.props.logoutUser();
          }}
          innerDivStyle={{display: 'flex', alignItems: 'center'}}
        >
          Wyloguj&nbsp;<LogoutIcon/>
        </MenuItem>
      )
    }
    return (
      <MenuItem onClick={this.handlePopup}>
        Logowanie
      </MenuItem>
    );
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handlePopup = () => this.setState({popup: !this.state.popup});

  createButton = () => {
    const {user, admins} = this.props;
    if (!user || !admins || !admins[user.uid]) {
      return null;
    }
    return (
      <MenuItem
        containerElement={<Link to="/dodaj_miejsce"/>}
        primaryText="Utwórz miejsce"
      />
    )
  };

  panelButton = () => {
    const {user} = this.props;
    if (!user) {
      return null;
    }
    return (
      <MenuItem
        containerElement={<Link to="/panel"/>}
        primaryText="Panel użytkownika"
      />
    )
  };

  render() {
    return (
      <div style={{position: 'fixed', top: 0}}>
        <img src='imgs/templogo.png' className="logo" onClick={this.handleToggle}/>
        <Drawer open={this.state.open} className="drawer" containerStyle={drawerContainerStyle}>
          <MenuItem
            containerElement={<Link to="/"/>}
            primaryText="Strona główna"
          />
          <MenuItem
            containerElement={<Link to="/lista"/>}
            primaryText="Lista miejsc"
          />
          {this.createButton()}
          {/*{this.panelButton()}*/}
          {this.loginButton()}
        </Drawer>
        <LoginRegisterDialog popup={this.state.popup} callback={this.handlePopup}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    admins: state.auth.admins,
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
