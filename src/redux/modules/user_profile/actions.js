import firebase from "firebase/index";

export const resetEmail = (email) => {
  let user = firebase.auth().currentUser;
  user.updateEmail(email)
    .catch((e) => console.log(e));
};

export const resetPassword = (email) =>{
  let auth = firebase.auth();
  auth.sendPasswordResetEmail(email)
    .catch((e) => console.log(e));
};
