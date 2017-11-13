import {API_ACTIONS} from '../../actionTypes';

export const cardList = (state = {activePlace: null}, action) => {
  switch (action.type) {
    case API_ACTIONS.SELECT_PLACE:
      return {...state, activePlace: action.payload.place};
    default:
      return state;
  }
};
