import React, { RefObject } from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import App from './App';
import reportWebVitals from './reportWebVitals';

const notistackRef: RefObject<any> = React.createRef();
const onClickDismiss = (key: any) => () => {
  notistackRef.current.closeSnackbar(key);
};

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider
      ref={notistackRef}
      maxSnack={3}
      action={(key: any) => (
        <IconButton sx={{ padding: '12px, 0, 0, 0', width: '100%', height: '100%' }} onClick={onClickDismiss(key)}>
          <Close />
        </IconButton>
      )}
      anchorOrigin={
        {
          vertical: 'top',
          horizontal: 'left',
        }
      }
    >
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
