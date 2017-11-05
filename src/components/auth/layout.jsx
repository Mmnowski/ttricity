import React from 'react';
import AppBar from 'material-ui/AppBar';
import {connect} from 'react-redux';
import {loginUser, logoutUser, registerUser} from "../../redux/modules/auth/actions";
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {FlatButton, TextField} from "material-ui";
import {Tab, Tabs} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

class BarLayout extends React.Component {
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
    };
  }

  handleOpen = () => {
    this.setState({popup: true});
  };

  handleClose = () => {
    this.setState({popup: false});
  };

  loginButton() {
    if (this.props.user) {
      return (
        <RaisedButton
          label="Wyloguj"
          className="login-button"
          backgroundColor="#a4c639"
          onClick={this.props.logoutUser}
        />
      )
    }
    return (
      <RaisedButton
        label="Logowanie"
        className="login-button"
        backgroundColor="#a4c639"
        onClick={this.handleOpen}
      />
    );
  }

  setField = (value, name) => {
    this.setState({[name]: value});
  };

  validateLogin = () => {
    const {email, password} = this.state;
    if (email && password) {
      this.props.loginUser(email, password);
    }
    else {
      console.log("error");
    }
  };

  validateRegister = () => {
    const {email_register, password1, password2} = this.state;
    if (email_register && password1 && password1 === password2) {
      this.props.registerUser(email_register, password1);
    }
    else {
      console.log("error");
    }
  };

  handleSlide = (value) => {
    this.setState({slideIndex: value});
  };

  // clean this up...
  render() {
    const {error} = this.props;
    return (
      <div>
        <AppBar
          title="TurystyczneTriCity"
          iconElementRight={this.loginButton()}
          iconStyleRight={{alignSelf: 'center', marginTop: 0}}
        />
        <Dialog
          modal={false}
          open={this.state.popup && !this.props.user}
          onRequestClose={this.handleClose}
          actionsContainerStyle={{height: 100}}
        >
          <div>
            <Tabs
              onChange={this.handleSlide}
              value={this.state.slideIndex}
            >
              <Tab label="Logowanie" value={0}/>
              <Tab label="Rejestracja" value={1}/>
            </Tabs>
            <SwipeableViews
              index={this.state.slideIndex}
              onChangeIndex={this.handleSlide}
            >
              <div className="login-content">
                <TextField
                  hintText="Podaj email"
                  floatingLabelText="Email"
                  onChange={(e, newValue) => this.setField(newValue, 'email')}
                />
                <br/>
                <TextField
                  hintText="Podaj hasło"
                  floatingLabelText="Hasło"
                  type="password"
                  onChange={(e, newValue) => this.setField(newValue, 'password')}
                />
                <br/>
                <FlatButton label="Zaloguj" primary={true} onClick={this.validateLogin}/>
                <br/>
                <p style={{color: 'red'}}>{error}</p>
              </div>
              <div className="login-content">
                <TextField
                  hintText="Podaj email"
                  floatingLabelText="Email"
                  onChange={(e, newValue) => this.setField(newValue, 'email_register')}
                />
                <br/>
                <TextField
                  hintText="Podaj hasło"
                  floatingLabelText="Hasło"
                  type="password"
                  onChange={(e, newValue) => this.setField(newValue, 'password1')}
                />
                <br/>
                <TextField
                  hintText="Potwierdź hasło"
                  floatingLabelText="Hasło"
                  type="password"
                  onChange={(e, newValue) => this.setField(newValue, 'password2')}
                />
                <br/>
                <FlatButton label="Zarejestruj" primary={true} onClick={this.validateRegister}/>
                <br/>
                <p style={{color: 'red'}}>{error}</p>
              </div>
            </SwipeableViews>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    error: state.auth.error,
  };
};

const mapDispatchToProps = {
  loginUser,
  logoutUser,
  registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(BarLayout);
