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
};
