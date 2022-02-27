import React from 'react';
import { CssBaseline } from '@mui/material';
import Routes from './http/routes';
import './styles/global.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ContentContainer, FullContainer } from './styles/global';
import { CustomContainer, GlobalStyle } from './styles/globalStyle';

const App: React.FC = () => (
  <CustomContainer>
    <GlobalStyle />
    <Routes />
  </CustomContainer>
);

export default App;
