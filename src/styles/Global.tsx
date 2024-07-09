import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

export const GlobalStyles = createGlobalStyle`
  ${reset}

  :root {
    --color-bg: #aaafff;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  @media (prefers-color-scheme: light) {
    :root {
    }
  }
`;
