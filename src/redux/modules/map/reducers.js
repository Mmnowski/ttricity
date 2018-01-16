import {API_ACTIONS} from '../../actionTypes';
import * as _ from 'lodash';

export const initialState = {
  marker: null,
  places: null,
};

const validatePlace = (place) => {
  return place.name && place.img && place.description && place.lat && place.lon;
};

export const map = (state = initialState, action) => {
  switch (action.type) {
    case API_ACTIONS.SAVE_MARKER:
      return {
        ...state,
        marker: action.payload.marker,
      };
    case API_ACTIONS.PLACE_FETCH_SUCCESS:
      let copy = [];
      if (action.payload) {
        _.forEach(action.payload,(place, index) => {
          if (validatePlace(place)) {
            copy.push({...place, id: index});
          }
        });
      }
      return {
        ...state,
        places: copy,
      };
    default:
      return state;
  }
};
