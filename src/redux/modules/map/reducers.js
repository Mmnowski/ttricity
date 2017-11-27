import {API_ACTIONS} from '../../actionTypes';

const initialState = {
  marker: null,
  places: null,
};

export const map = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case API_ACTIONS.SAVE_MARKER:
      return {
        ...state,
        marker: action.payload.marker,
      };
    case API_ACTIONS.PLACE_FETCH_SUCCESS:
      return{
        ...state,
        places: action.payload.places,
      };
    default:
      return state;
  }
};
