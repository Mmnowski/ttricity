import {API_ACTIONS} from '../../actionTypes';

const initialState = {
  isFetching: false,
  error: '',
  user: null,
  email: false,
};

export const codeToMsgMap = {
  'auth/invalid-email': 'Niepoprawny adres email.',
  'auth/user-not-found': 'Błedny adres email lub hasło.',
  'auth/wrong-password': 'Błedny adres email lub hasło.',
  'auth/email-already-in-use': 'Adres email jest już w użyciu.',
  'auth/network-request-failed': 'Błąd połączenia z internetem.',
  'auth/operation-not-allowed': 'Akcja niedozwolona.',
  'auth/user-disabled': 'Użytkownik został zablokowany.'
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
        error: codeToMsgMap[action.payload.code] ? codeToMsgMap[action.payload.code] : action.payload.message,
        isFetching: false
      };
    case API_ACTIONS.LOGOUT_USER:
      return initialState;
    case API_ACTIONS.FIREBASE_EMAIL_SENT:
      return {
        ...state,
        email: true,
        error: '',
      };
    case API_ACTIONS.CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: '',
        email: false,
      };
    default:
      return state;
  }
};
