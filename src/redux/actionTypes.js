import config from '../config/index';

export const ROOT_URL = config.apiRootUrl;
//do commita
export const API_ACTIONS = {
  GEOLOCATE: {
    action: 'geolocate',
    url: `https://www.googleapis.com/geolocation/v1/geolocate`,
    startRequest: 'geolocate/REQUEST_STARTED',
    successRequest: 'geolocate/REQUEST_SUCCESS',
    failureRequest: 'geolocate/REQUEST_FAILURE',
  },
  FIREBASE_LOGIN: {
    action: 'firebase_login',
  },
  FIREBASE_REGISTER: {
    action: 'firebase_register',
  },
  FIREBASE_LOGIN_SUCCESS: {
    action: 'firebase_login_success',
  },
  FIREBASE_EMAIL_SENT: {
    action: 'firebase_email_sent',
  },
  FIREBASE_LOGIN_FAIL: {
    action: 'firebase_login_fail',
  },
  LOGOUT_USER: {
    action: 'logout_user',
  },
  SELECT_PLACE: {
    action: 'select_place',
  },
  SEARCH_FOR_PLACE: {
    action: 'search_for_place',
  },
  CLEAR_AUTH_ERROR: {
    action: 'clear_auth_error',
  },
  SAVE_MARKER: {
    action: 'save_marker',
  },
  PLACE_FETCH_SUCCESS: {
    action: 'place_fetch_success',
  },
  COMMENT_FETCH_SUCCESS: {
    action: 'comment_fetch_success',
  },
  ADMIN_FETCH_SUCCESS: {
    action: 'admin_fetch_success',
  },
};
