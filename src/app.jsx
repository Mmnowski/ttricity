/* Import the requirements */
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Routes from './routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/* Start the app */
const rootEl = document.getElementById('site');
ReactDOM.render((
  <AppContainer>
    <MuiThemeProvider>
      <Routes/>
    </MuiThemeProvider>
  </AppContainer>
), rootEl);
