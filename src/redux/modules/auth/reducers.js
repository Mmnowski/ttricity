import {API_ACTIONS} from '../../actionTypes';

const initialState = {
  isFetching: false,
  error: '',
  user: null,
  email: false,
  admins: null,
  tempUser: null,
  resend: '',
};

export const EMAIL_ERROR = 'Potwierdź adres email.';
export const PASSWORD_ERROR = 'Błedny adres email lub hasło.';

export const codeToMsgMap = {
  'auth/invalid-email': 'Niepoprawny adres email.',
  'auth/user-not-found': PASSWORD_ERROR,
  'auth/wrong-password': PASSWORD_ERROR,
  'auth/email-already-in-use': 'Adres email jest już w użyciu.',
  'auth/network-request-failed': 'Błąd połączenia z internetem.',
  'auth/operation-not-allowed': 'Akcja niedozwolona.',
  'auth/user-disabled': 'Użytkownik został zablokowany.'
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case API_ACTIONS.FIREBASE_LOGIN:
      return {
        ...state,
        isFetching: true,
        error: '',
        tempUser: null,
        resend: '',
      };
    case API_ACTIONS.FIREBASE_LOGIN_SUCCESS:
      const {emailVerified} = action.payload;
      if (!emailVerified) {
        return {
          ...state,
          error: EMAIL_ERROR,
          tempUser: action.payload,
        };
      }
      return {
        ...initialState,
        user: action.payload,
        tempUser: null,
      };
    case API_ACTIONS.RESEND_MAIL:
      return{
        ...state,
        resend: action.payload.email,
        tempUser: null,
        email: true,
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
        tempUser: null,
        resend: '',
      };
    case API_ACTIONS.ADMIN_FETCH_SUCCESS:
      return{
        ...state,
        admins: action.payload,
      };
    default:
      return state;
  }
};
