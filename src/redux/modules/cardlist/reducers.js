import {API_ACTIONS} from '../../actionTypes';

const initialState = {
  activePlace: null,
  queryPlace: null,
};

export const cardList = (state = initialState, action) => {
  switch (action.type) {
    case API_ACTIONS.SELECT_PLACE:
      return {
        ...state,
        activePlace: action.payload.place,
      };
    case API_ACTIONS.SEARCH_FOR_PLACE:
      return{
        ...state,
        queryPlace: {
         lat: action.payload.placeToFind.geometry.location.lat(),
         lon: action.payload.placeToFind.geometry.location.lng()
        },
      };
    default:
      return state;
  }
};
