import {API_ACTIONS} from '../../actionTypes';

export function saveMarker(marker) {
  return {
    payload: {marker},
    type: API_ACTIONS.SAVE_MARKER,
  }
}
