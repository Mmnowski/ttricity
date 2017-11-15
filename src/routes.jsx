import React from 'react';
/* React Router */
import {Provider} from 'react-redux';
import {IndexRoute, Router} from 'react-router';
import {BrowseRouter, Route} from 'react-router-dom';
/* Router dependencies preparing */
import {history, store} from './prepare';
/* App configs */
import config from './config';
/* Components */
import {Layout, NotFound} from './components';
import {Home} from './components/home';
import {List} from './components/cardlist/index';

/* Routes */
const {urlPrefix} = config;
const Routes = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/lista" component={Layout}>
          <IndexRoute component={List}/>
        </Route>
        <Route path={urlPrefix} component={Layout}>
          <IndexRoute component={Home}/>
        </Route>
        <Route path="*" component={NotFound}/>
      </Router>
    </Provider>
  );
};

export default Routes;
