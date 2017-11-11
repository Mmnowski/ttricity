import config from '../config/index';

export const ROOT_URL = config.apiRootUrl;

export const API_ACTIONS = {
  SAMPLE_ACTION: {
    action: 'sample_action',
    url: `${ROOT_URL}auth/convert-token/`,
    startRequest: 'sample_action/REQUEST_STARTED',
    successRequest: 'sample_action/REQUEST_SUCCESS',
    failureRequest: 'sample_action/REQUEST_FAILURE',
  },
  FIREBASE_LOGIN:{
    action: 'firebase_login',
  },
  FIREBASE_REGISTER:{
    action: 'firebase_register',
  },
  FIREBASE_LOGIN_SUCCESS:{
    action: 'firebase_login_success',
  },
  FIREBASE_EMAIL_SENT:{
    action: 'firebase_email_sent',
  },
  FIREBASE_LOGIN_FAIL:{
    action: 'firebase_login_fail',
  },
  LOGOUT_USER:{
    action: 'logout_user',
  },
  SELECT_PLACE:{
    action: 'select_place',
  }
};
