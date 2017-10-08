import {auth} from './redux/modules/auth/reducers';

/* Redux */
import {routerReducer, syncHistoryWithStore} from 'react-router-redux';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';

/* React Router */
import {hashHistory, browserHistory} from 'react-router';
import ReduxPromise from 'redux-promise';
/* Reducers */
import {createLogger} from 'redux-logger';

// const reducers = require('./reducers');
import thunk from 'redux-thunk';
/* App configs */
import config from './config';

/* Combine Reducers */
const reducer = combineReducers({
  routing: routerReducer,
  auth,
});

const logger = createLogger({
  // ...options
});

/* Initial the store */
function configureStore({}) {
  // Initial the redux devtools for Chrome
  // https://github.com/zalmoxisus/redux-devtools-extension/
  const createdStore = createStore(reducer, {},
    compose(
      applyMiddleware(logger, ReduxPromise, thunk),
      window.devToolsExtension ? window.devToolsExtension() : (f) => f)
  );

  const {hot} = module;
  if (hot) {
    hot.accept('./reducers', () => {
      const auth = require('./redux/modules/auth/reducers');
      const nextReducer = combineReducers({
        routing: routerReducer,
        auth,
      });
      createdStore.replaceReducer(nextReducer);
    });
  }

  return createdStore;
}

// Default saves and read saved redux state from local storage
const initialState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

export const store = configureStore(initialState);
store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});
/* Initial history */
let routerHistory;
if (config.historyBackend === 'browserHistory') {
  routerHistory = browserHistory;
} else {
  routerHistory = hashHistory;
}
export const history = syncHistoryWithStore(routerHistory, store);
