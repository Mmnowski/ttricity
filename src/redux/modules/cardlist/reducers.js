import {API_ACTIONS} from '../../actionTypes';

const initialState = {
  activePlace: null,
  queryPlace: null,
  comments: null,
};

export const cardList = (state = initialState, action) => {
  switch (action.type) {
    case API_ACTIONS.SAMPLE_ACTION.startRequest:
      console.log(action.res);
      return{
        ...state,
      };
    case API_ACTIONS.SELECT_PLACE:
      return {
        ...state,
        activePlace: action.payload.place,
      };
    case API_ACTIONS.SEARCH_FOR_PLACE:
      return {
        ...state,
        queryPlace: {
          lat: action.payload.placeToFind.geometry.location.lat(),
          lon: action.payload.placeToFind.geometry.location.lng()
        },
      };
    case API_ACTIONS.COMMENT_FETCH_SUCCESS:
      if (action.payload.length === 0){
        return state;
      }
      let comments = {};
      action.payload.forEach((comment) => {
        if (!comments[comment.place_id]){
          comments[comment.place_id] = [comment];
        }
        else {
          comments[comment.place_id].push(comment);
        }
      });
      return {
        ...state,
        comments: comments,
      };
    default:
      return state;
  }
};
