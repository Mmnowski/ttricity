import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import {TextField, Snackbar} from "material-ui";
import {resetEmail, resetPassword} from "../../redux/modules/user_profile/actions";
import {history} from "../../prepare";

class UserProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      disabled: true,
      button: "Zmień E-mail",
      email: this.props.user.email,
      error: "",
      open: false,
      msg: "",
    }
  }

  componentWillMount() {
    if (!this.props.user) {
      history.push('/');
    }
  }

  handleButtonEmail(){
    if (this.state.button === "Zmień E-mail"){
      this.setState({disabled: false, button: "Zatwierdź"});
    }
    if (this.state.button === "Zatwierdź"){
      if(this.state.email === ""){
        this.setState({error: "Pole nie może być puste!"})
      }
      else{
        resetEmail(this.state.email);
        this.setState({disabled: true, button: "Zmień E-mail", open:true, msg: "E-mail został zmieniony"});
      }
    }
  }

  handleButtonPassword(){
    if(this.state.email === ""){
      this.setState({open: true, msg: "E-mail nie moze byc pusty!"});
    }
    else{
      resetPassword(this.state.email);
      this.setState({open: true, msg: "E-mail z potwierdzeniem został wysłany na podany adres"});
    }
  }

  render(){
    return(
      <div className="panelBox">
        <p>Aktualny E-mail:</p>
        <TextField
          hintText="E-Mail"
          disabled={this.state.disabled}
          onChange={(e) => this.setState({email: e.target.value})}
          errorText={this.state.error}
          value={this.state.email}
          inputStyle={{width: '100%', textAlign: 'center'}}
          hintStyle={{width: '100%', textAlign: 'center'}}
          style={{width: '100%'}}
        />
        <FlatButton style={{width: '100%'}} onClick={() => this.handleButtonEmail()}>{this.state.button}</FlatButton>
        <FlatButton style={{width: '100%'}} onClick={() => this.handleButtonPassword()}>Zresetuj hasło</FlatButton>
        <Snackbar
          open={this.state.open}
          message={this.state.msg}
          autoHideDuration={4000}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapStateToProps, null)(UserProfile);