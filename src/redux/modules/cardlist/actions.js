import {API_ACTIONS} from '../../actionTypes';
import {startRequest} from '../../api';

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

export function test() {
  const action = API_ACTIONS.SAMPLE_ACTION;
  const postData = {};
  const attrs = {};
  const params = {key: 'GOOGLE_API_KEY'};
  return startRequest({}, action, attrs, params, 'POST', postData);
}