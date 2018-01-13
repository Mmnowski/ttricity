import firebase from "firebase/index";

export const resetEmail = (email) => {
  let user = firebase.auth().currentUser;
  // return (dispatch) => {
  user.updateEmail(email)
    .catch((e) => console.log(e));
  // }
};

export const resetPassword = (email) =>{
  let auth = firebase.auth();
  // return (dispatch) => {
  auth.sendPasswordResetEmail(email)
    .catch((e) => console.log(e));
  // };
};