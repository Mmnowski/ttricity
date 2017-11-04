import React from 'react';
import AppBar from 'material-ui/AppBar';
import {connect} from 'react-redux';
import {loginUser} from "../../redux/modules/auth/actions";
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

class BarLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
    };
  }

   handleOpen = () => {
    this.setState({popup: true});
  };

  handleClose = () => {
    this.setState({popup: false});
  };

  loginButton() {
    return (
      <RaisedButton
        label="Login"
        className="login-button"
        backgroundColor="#a4c639"
        onClick={this.handleOpen}
      />
    );
  }

  render() {
    return (
      <div>
        <AppBar
          title="Turystyczne Tri City"
          iconElementRight={this.loginButton()}
          iconStyleRight={{alignSelf: 'center', marginTop: 0}}
        />
        <Dialog
          modal={false}
          open={this.state.popup}
          onRequestClose={this.handleClose}
        >
          <div className="login-content">
            <div className="content">
              <h1>zaloguj</h1>
            </div>
            <div className="content">
              <h1>zarejestruj</h1>
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
  };
};

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(BarLayout);
