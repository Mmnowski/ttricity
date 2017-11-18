import {API_ACTIONS} from '../../actionTypes';

const initialState = {
  marker: null,
};

export const map = (state = initialState, action) => {
  switch (action.type) {
    case API_ACTIONS.SAVE_MARKER:
      return {
        ...state,
        marker: action.payload.marker,
      };
    default:
      return state;
  }
};
