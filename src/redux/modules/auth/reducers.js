import {API_ACTIONS} from '../../actionTypes';

const initialState = {
  isFetching: false,
  error: '',
  user: null,
  email: false,
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
        isFetching: true,
        error: '',
      };
    case API_ACTIONS.FIREBASE_LOGIN_SUCCESS:
      const {emailVerified} = action.payload;
      if (!emailVerified) {
        return {
          ...state,
          error: 'Potwierdź adres email.',
        };
      }
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
    case API_ACTIONS.FIREBASE_EMAIL_SENT:
      return {
        ...state,
        email: !state.email,
        error: '',
      };
    default:
      return state;
  }
};
