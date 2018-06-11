import {auth} from './redux/modules/auth/reducers';
import {cardList} from './redux/modules/cardlist/reducers';
import {initialState, map} from './redux/modules/map/reducers';
/* Redux */
import {routerReducer, syncHistoryWithStore} from 'react-router-redux';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import firebase from 'firebase';
/* React Router */
import {browserHistory, hashHistory} from 'react-router';
import ReduxPromise from 'redux-promise';
/* Reducers */
import {createLogger} from 'redux-logger';
// const reducers = require('./reducers');
import thunk from 'redux-thunk';
/* App configs */
import config from './config';
import {FIREBASE_KEY, MAP_KEY} from '../secret';
import {SOPOT_CENTRUM} from "./redux/actionTypes";

/* Combine Reducers */
const reducer = combineReducers({
  routing: routerReducer,
  auth,
  cardList,
  map,
});

const logger = createLogger({});

/* Initial the store */
function configureStore(initialState) {
  MAP_KEY.includes('Your') && console.error('Include your own Google Map API key in secret.js file');
  FIREBASE_KEY.includes('Your') && console.error('Include your own Google Firebase API key in secret.js file');
  // Init firebase connection
  const firebaseConfig = {
    apiKey: FIREBASE_KEY,
    authDomain: "turystycznetricity-8a97c.firebaseapp.com",
    databaseURL: "https://turystycznetricity-8a97c.firebaseio.com",
    projectId: "turystycznetricity-8a97c",
    storageBucket: "",
    messagingSenderId: "250882144902"
  };
  firebase.initializeApp(firebaseConfig);
  // Production should be without logger
  const createdStore = process.env.NODE_ENV === 'production' ?
    createStore(reducer, initialState, compose(applyMiddleware(ReduxPromise, thunk)))
    :
    createStore(reducer, initialState,
      compose(applyMiddleware(logger, ReduxPromise, thunk),
        window.devToolsExtension ? window.devToolsExtension() : (f) => f)
    );
  const {hot} = module;
  if (hot) {
    hot.accept('./reducers', () => {
      const auth = require('./redux/modules/auth/reducers');
      const cardList = require('./redux/modules/cardlist/reducers');
      const map = require('./redux/modules/map/reducers');
      const nextReducer = combineReducers({
        routing: routerReducer,
        auth,
        cardList,
        map,
      });
      createdStore.replaceReducer(nextReducer);
    });
  }
  return createdStore;
}

// Default saves and read saved redux state from local storage
const previousState = localStorage.getItem('reduxState');
let initState = previousState ? JSON.parse(previousState) : {};
initState['map'] = initialState;

export const store = configureStore(initState);
store.subscribe(() => {
  const tempState = {...store.getState()};
  tempState.map = {...tempState.map, marker: null};
  tempState.cardList = {...tempState.cardList, queryPlace: null, geolocate: SOPOT_CENTRUM};
  localStorage.setItem('reduxState', JSON.stringify(tempState));
});
/* Initial history */
let routerHistory;
if (config.historyBackend === 'browserHistory') {
  routerHistory = browserHistory;
} else {
  routerHistory = hashHistory;
}
export const history = syncHistoryWithStore(routerHistory, store);
