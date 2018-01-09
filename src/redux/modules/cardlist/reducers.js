import * as _ from 'lodash';
import {API_ACTIONS} from '../../actionTypes';

const initialState = {
  activePlace: null,
  queryPlace: null,
  comments: null,
  geolocate: null,
};

export const cardList = (state = initialState, action) => {
  switch (action.type) {
    case API_ACTIONS.GEOLOCATE.successRequest:
      return {
        ...state,
        geolocate: {
          lat: action.res.location.lat,
          lon: action.res.location.lng
        },
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
      if (action.payload.length === 0) {
        return state;
      }
      let comments = {};
      _.forEach(action.payload, (comment, index) => {
        if (!comments[comment.place_id]) {
          comments[comment.place_id] = [{...comment, id: index}];
        }
        else {
          comments[comment.place_id].push({...comment, id: index});
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
