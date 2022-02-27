import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  body {
    background: rgba(99, 210, 232, 0.5);
  }

`;

export const CustomContainer = styled('div')`
  width: 90%;
  height: 100vh;
  padding-top: 20px;
  padding-bottom: 20px;
  margin: 0 auto;
`;
