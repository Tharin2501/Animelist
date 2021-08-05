import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#ffff", // White
  fontColor: "SlateBlue", // SlateBlue
  fill: "DarkSlateBlue", // darkslateblue
};

export const darkTheme = {
  body: "#121212", // Black
  fontColor: "aliceblue", // OR SlateGray
  fill: "DarkOrange", // DarkOrange (used in NavigationBar)
};

export const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.fontColor};
        fill: ${({ theme }) => theme.fill};
    }
`;
