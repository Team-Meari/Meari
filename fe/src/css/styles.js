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
  overflow-x: hidden;
}
* {
  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
      //background-color: #0cb46c;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
      //background-color: #ebebeb;
      border-radius: 10px;
    }
}
  `;
