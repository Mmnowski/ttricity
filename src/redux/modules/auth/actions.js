import {API_ACTIONS} from '../../actionTypes';
import {startRequest} from '../../api';

export function testUser() {
  const action = API_ACTIONS.SAMPLE_ACTION;
  const postData = {};
  const attrs = {};
  const params = {};
  return startRequest({}, action, attrs, params, 'GET', postData);
}
