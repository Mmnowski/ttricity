import {API_ACTIONS} from '../../actionTypes';

const initialState = {
  isFetching: false,
  error: '',
  user: null,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case API_ACTIONS.SAMPLE_ACTION:
      return {
        ...state,
      };
    case API_ACTIONS.FIREBASE_LOGIN:
      return {
        ...state,
        isFetching: true
      };
    case API_ACTIONS.FIREBASE_LOGIN_SUCCESS:
      return {
        ...initialState,
        user: action.payload,
      };
    case API_ACTIONS.FIREBASE_LOGIN_FAIL:
      return {
        ...state,
        error: action.payload.message,
        isFetching: false
      };
    case API_ACTIONS.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};
