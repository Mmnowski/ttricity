import React from 'react';
import {connect} from 'react-redux';
import {clearAuthError, loginUser, logoutUser, registerUser, resendVerifyEmail} from "../../redux/modules/auth/actions";
import Dialog from 'material-ui/Dialog';
import {FlatButton, Snackbar, TextField} from "material-ui";
import {Tab, Tabs} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import '../layout.scss';
import {resetPassword} from "../../redux/modules/user_profile/actions";
import {EMAIL_ERROR, PASSWORD_ERROR} from "../../redux/modules/auth/reducers";

class LoginRegisterDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      email_register: '',
      password1: '',
      password2: '',
      password: '',
      slideIndex: 0,
      error: '',
      email_forgot: '',
      error_forgot: '',
      open: false,
      msg: '',
    };
  }

  componentWillMount() {
    this.props.clearAuthError();
  }

  setField = (value, name) => {
    this.setState({[name]: value});
  };

  validateLogin = () => {
    const {email, password} = this.state;
    if (email && password) {
      this.setState({error: ''});
      this.props.loginUser(email, password);
    }
    else {
      this.props.clearAuthError();
      this.setState({error: 'Podaj login i hasło.'});
    }
  };

  validateRegister = () => {
    const {email_register, password1, password2} = this.state;
    if (email_register && password1 && password1 === password2) {
      this.setState({error: ''});
      return this.props.registerUser(email_register, password1);
    }
    this.props.clearAuthError();
    if (!password1 || !password2 || !email_register) {
      this.setState({error: 'Wszystkie pola są wymagane.'});
    }
    else {
      this.setState({error: 'Podane hasła są różne.'});
    }
  };

  handleSlide = (value) => {
    this.setState({slideIndex: value, error: ''});
    this.props.clearAuthError();
  };

  renderError() {
    const {tempUser, error} = this.props;
    return (
      <div style={{textAlign: 'center'}}>
        <p style={{color: 'red'}}>
          {error}{this.state.error}
        </p>
        {tempUser && error === EMAIL_ERROR &&
        <FlatButton primary
                    onClick={() => this.props.resendVerifyEmail(this.props.tempUser)}>
          Wyślij ponownie mail aktywacyjny
        </FlatButton>}
        {error === PASSWORD_ERROR && <FlatButton primary onClick={this.sendEmail}>
          Zapomniałeś hasła?
        </FlatButton>}
      </div>
    );
  }

  onKeyPress = (event, type) => {
    if (event.charCode === 13) {
      event.preventDefault();
      if (type === 'login') {
        this.validateLogin();
      }
      else {
        this.validateRegister();
      }
    }
  };

  renderLogin() {
    if (this.props.email && this.props.resend.length > 0) {
      return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <h1 style={{display: 'flex', justifyContent: 'center'}}>
            Wysłaliśmy email z potwierdzeniem na {this.props.resend}.
          </h1>
          <FlatButton primary onClick={this.props.clearAuthError}>Powrót</FlatButton>
        </div>
      );
    }
    return (
      <div className="login-content">
        <form onSubmit={this.validateLogin} className="flex-center">
          <TextField
            className="flex-login-email"
            hintText="Podaj email"
            floatingLabelText="Email"
            onKeyPress={(e) => this.onKeyPress(e, 'login')}
            onChange={(e, newValue) => this.setField(newValue, 'email')}
          />
          <br/>
          <TextField
            className="flex-login-password"
            hintText="Podaj hasło"
            floatingLabelText="Hasło"
            onKeyPress={(e) => this.onKeyPress(e, 'login')}
            type="password"
            onChange={(e, newValue) => this.setField(newValue, 'password')}
          />
          <br/>
          <FlatButton label="Zaloguj" primary onClick={this.validateLogin}/>
          <br/>
        </form>
        {this.renderError()}
      </div>
    );
  }

  renderRegister() {
    if (this.props.email) {
      return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <h1 style={{display: 'flex', justifyContent: 'center'}}>
            Dziękujemy za rejestrację, wysłaliśmy email z potwierdzeniem.
          </h1>
          <FlatButton primary onClick={() => this.handleSlide(0)}>Powrót</FlatButton>
        </div>
      );
    }
    return (
      <div className="login-content">
        <form onSubmit={this.validateRegister} className="flex-center">
          <TextField
            className="flex-register-email"
            hintText="Podaj email"
            floatingLabelText="Email"
            onKeyPress={(e) => this.onKeyPress(e, 'register')}
            onChange={(e, newValue) => this.setField(newValue, 'email_register')}
          />
          <br/>
          <TextField
            className="flex-register-password"
            hintText="Podaj hasło"
            floatingLabelText="Hasło"
            type="password"
            onKeyPress={(e) => this.onKeyPress(e, 'register')}
            onChange={(e, newValue) => this.setField(newValue, 'password1')}
          />
          <br/>
          <TextField
            className="flex-register-repassword"
            hintText="Potwierdź hasło"
            floatingLabelText="Hasło"
            type="password"
            onKeyPress={(e) => this.onKeyPress(e, 'register')}
            onChange={(e, newValue) => this.setField(newValue, 'password2')}
          />
          <br/>
          <FlatButton label="Zarejestruj" primary onClick={this.validateRegister}/>
          <br/>
        </form>
        {this.renderError()}
      </div>
    );
  }

  renderForgotPassword() {
    return (
      <div className="login-content flex-center">
        <TextField
          className="flex-register-password"
          hintText="Podaj e-mail"
          floatingLabelText="E-mail"
          onChange={(e, newValue) => this.setField(newValue, 'email_forgot')}
          errorText={this.state.error_forgot}
        />
        <br/>
        <FlatButton label="Wyślij" primary onClick={this.sendEmail}/>
        <br/>
      </div>
    );
  }

  sendEmail = () => {
    if (this.state.email === "") {
      this.setState({error_forgot: "E-mail nie moze byc pusty!"});
    }
    else {
      resetPassword(this.state.email);
      this.setState({open: true, msg: "E-mail z potwierdzeniem został wysłany na podany adres", error_forgot: ''});
    }
  };

  render() {
    return (
      <Dialog
        modal={false}
        open={this.props.popup && !this.props.user}
        onRequestClose={this.props.callback}
        actionsContainerStyle={{height: 100}}
        style={{zIndex: 9999}}
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
            {this.renderLogin()}
            {this.renderRegister()}
            {this.renderForgotPassword()}
          </SwipeableViews>
          <Snackbar
            open={this.state.open}
            message={this.state.msg}
            autoHideDuration={4000}
          />
        </div>
      </Dialog>);
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    tempUser: state.auth.tempUser,
    resend: state.auth.resend,
    error: state.auth.error,
    email: state.auth.email,
  };
};

const mapDispatchToProps = {
  clearAuthError,
  loginUser,
  logoutUser,
  registerUser,
  resendVerifyEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegisterDialog);