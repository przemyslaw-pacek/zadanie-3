import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    html {
    box-sizing: border-box;
  }
  
  *, ::after, ::before {
    box-sizing: inherit;
  }
  
  body { 
    color: white;
    background: #222;    
    max-width: 1000px;
    margin: 0 auto;
  }
`;
