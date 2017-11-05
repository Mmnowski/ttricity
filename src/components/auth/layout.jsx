import React from 'react';
import AppBar from 'material-ui/AppBar';
import {connect} from 'react-redux';
import {loginUser, logoutUser} from "../../redux/modules/auth/actions";
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {FlatButton, TextField} from "material-ui";

class BarLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      email: '',
      password: '',
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
      this.setState({popup: false})
    }
    else {
      console.log("error");
    }
  };

  render() {
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
        >
          <div className="login-content">
            <div className="content">
              <h1>Logowanie</h1>
              <form onSubmit={(e) => {
                e.preventDefault();
                this.validateLogin()
              }}>
                <TextField
                  hintText="Podaj email"
                  floatingLabelText="Email"
                  onChange={(e, newValue) => this.setField(newValue, 'email')}
                />
                <TextField
                  hintText="Podaj hasło"
                  floatingLabelText="Hasło"
                  type="password"
                  onChange={(e, newValue) => this.setField(newValue, 'password')}
                />
                <br/>
                <FlatButton label="Zaloguj" primary={true} onClick={this.validateLogin}/>
              </form>
              <br/>
              <p style={{color: 'red'}}>{this.props.error}</p>
            </div>
            <div className="content">
              <h1>Rejestracja</h1>
            </div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(BarLayout);
