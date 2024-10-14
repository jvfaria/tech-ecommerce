import React, { RefObject } from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Creators as SnackbarCreators } from './redux/modules/Snackbar/ducks';

import { store } from './redux/store/index';

const notistackRef: RefObject<any> = React.createRef();
const dismissSnackbar = (key: string) => () => {
  notistackRef.current.closeSnackbar(key);
  store.dispatch(SnackbarCreators.closeSnackbar(key));
  console.log('key', key);
};

const dismissSnackbarOnClose = () => {
  console.log('event', notistackRef.current);
};

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} preventDuplicate>
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
