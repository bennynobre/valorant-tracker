import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
    background-color: #1a1a2e;
    color: #e0e0e0;
    min-height: 100vh;
  }

  h1, h2, h3, h4 {
    color: #e94560;
  }

  * {
    box-sizing: border-box;
  }
`;