import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
#root,
html,
body {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}
body {
  overflow: hidden;
}
  `;
