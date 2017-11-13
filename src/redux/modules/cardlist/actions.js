import {API_ACTIONS} from '../../actionTypes';

export function selectPlace(place) {
  return {
    payload: {place},
    type: API_ACTIONS.SELECT_PLACE
  };
}
