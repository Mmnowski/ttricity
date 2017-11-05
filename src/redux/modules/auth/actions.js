import {API_ACTIONS} from '../../actionTypes';
import firebase from 'firebase';

export const loginUser = (email, password) => {
  return (dispatch) => {
    dispatch({type: API_ACTIONS.FIREBASE_LOGIN});
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        console.log(error);
        loginUserFail(dispatch, error);
      });
  };
};

export const registerUser = (email, password) => {
  return (dispatch) => {
    dispatch({type: API_ACTIONS.FIREBASE_REGISTER});
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        loginUserFail(dispatch, error);
        console.log(error);
      });
  };
};

const loginUserFail = (dispatch, error) => {
  dispatch({
    type: API_ACTIONS.FIREBASE_LOGIN_FAIL,
    payload: error,
  });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: API_ACTIONS.FIREBASE_LOGIN_SUCCESS,
    payload: user
  });
};

export const logoutUser = () => {
  return {type: API_ACTIONS.LOGOUT_USER}
};
