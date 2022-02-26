import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    outline: 0;
    margin: 0;
    box-sizing: border-box;
    padding: 0;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background: #e6e6e6;
    color: #fff;
  }

  body, input, button {
    font-family: 'Roboto', serif;
    font-size: 16px;
  }

  button {
    cursor: pointer;
  }

  h1,h2,h3 {
    font-weight: 500;
  }
`

export default GlobalStyle;