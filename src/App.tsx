import React from 'react';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import Routes from './http/routes';
import './styles/global.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CustomContainer, GlobalStyle } from './styles/globalStyle';

const themeLight = createTheme({
  palette: {
    background: {
      default: 'rgba(99, 210, 232, 0.5)',
    },
  },
});
const App: React.FC = () => (

  <Provider store={store}>

    <ThemeProvider theme={themeLight}>
      <CustomContainer>
        <CssBaseline>
          <GlobalStyle />
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </CssBaseline>
      </CustomContainer>
    </ThemeProvider>
  </Provider>
);

export default App;
