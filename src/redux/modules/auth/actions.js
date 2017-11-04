import {API_ACTIONS} from '../../actionTypes';
import firebase from 'firebase';

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: API_ACTIONS.FIREBASE_LOGIN });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        console.log(error);

        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user))
          .catch(() => loginUserFail(dispatch));
      });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: API_ACTIONS.FIREBASE_LOGIN_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: API_ACTIONS.FIREBASE_LOGIN_SUCCESS,
    payload: user
  });
};