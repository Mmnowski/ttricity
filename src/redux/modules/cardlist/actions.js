import {API_ACTIONS} from '../../actionTypes';
import {startRequest} from '../../api';
import firebase from "firebase/index";

export function selectPlace(place) {
  return {
    payload: {place},
    type: API_ACTIONS.SELECT_PLACE
  };
}

export function findPlace(placeToFind) {
  return {
    payload: {placeToFind},
    type: API_ACTIONS.SEARCH_FOR_PLACE
  }
}


export const fetchComments = () => {
  return (dispatch) => {
    firebase.database().ref(`/comments/`)
      .on('value', snapshot => {
        dispatch({type: API_ACTIONS.COMMENT_FETCH_SUCCESS, payload: snapshot.val()});
      });
  };
};


export function test() {
  const action = API_ACTIONS.SAMPLE_ACTION;
  const postData = {};
  const attrs = {};
  const params = {key: 'GOOGLE_API_KEY'};
  return startRequest({}, action, attrs, params, 'POST', postData);
}