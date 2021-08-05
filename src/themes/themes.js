import { createGlobalStyle, ThemeProvider } from "styled-components";

export const lightTheme = {
  body: "#ffff", // White
  fontColor: "SlateBlue",
  fill: "DarkSlateBlue",
};

export const darkTheme = {
  body: "#121212", // Black
  fontColor: "aliceBlue", // OR SlateGray
  fill: "DarkOrange", // DarkOrange (used in NavigationBar hover)
};

/*  
    These are colors indepandent from dark/light theme
    How to use: color: ${({ theme }) => theme.colors.persianGreen};
*/
const colors = {
  colors: {
    slateBlue: "SlateBlue",
    aliceBlue: "aliceBlue",
    persianGreen: "#06B49A",
  },
};

export const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.fontColor};
        fill: ${({ theme }) => theme.fill}; 
    }
`;

/* 
    Used in app.tsx. All the descendants of App will have access to the theme object.
    src: https://dev.to/aromanarguello/how-to-use-themes-in-styled-components-49h 
*/
const Theme = ({ children }) => (
  <ThemeProvider theme={colors}>{children}</ThemeProvider>
);

export default Theme;
