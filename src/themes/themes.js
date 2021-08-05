import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#fff",
  fontColor: "#121212",
};

export const darkTheme = {
  body: "#121212",
  fontColor: "#fff",
};

export const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme.body};
        // color ?
    }
`;
