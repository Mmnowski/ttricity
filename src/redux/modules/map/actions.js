import {API_ACTIONS} from '../../actionTypes';
import firebase from 'firebase';

export function saveMarker(marker) {
  return {
    payload: {marker},
    type: API_ACTIONS.SAVE_MARKER,
  }
}

// firebase fetch once
// export const fetchPlaces = () => {
//   return (dispatch) => {
//     firebase.database().ref(`/places/`).once('value').then((snapshot) => {
//       dispatch({ type: API_ACTIONS.PLACE_FETCH_SUCCESS, payload: snapshot.val() });
//     })
//       .catch((error => console.log(error)))
//   };
// };

// firebase fetch constantly
export const fetchPlaces = () => {
  return (dispatch) => {
    firebase.database().ref(`/places/`)
      .on('value', snapshot => {
        dispatch({type: API_ACTIONS.PLACE_FETCH_SUCCESS, payload: snapshot.val()});
      });
  };
};