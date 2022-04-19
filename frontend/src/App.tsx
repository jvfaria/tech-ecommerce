import React from 'react';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { store } from './redux/store';
import Routes from './http/routes';
import './styles/global.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SnackbarComponent from './components/SnackbarComponent';

const themeLight = createTheme({
  palette: {
    background: {
      default: 'rgba(232, 232, 232, 0.8)',
    },
  },
});

// rgb(4, 11, 27) dark mode background

const App: React.FC = () => (

  <Provider store={store}>
    <SnackbarComponent />
    <ThemeProvider theme={themeLight}>
      <CssBaseline>
        <Routes />
      </CssBaseline>
    </ThemeProvider>
  </Provider>
);

export default App;
