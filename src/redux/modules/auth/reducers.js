import {API_ACTIONS} from '../../actionTypes';

const initialState = {
  isFetching: false,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case API_ACTIONS.SAMPLE_ACTION:
      return {
        ...state,
      };
    default:
      return state;
  }
};
