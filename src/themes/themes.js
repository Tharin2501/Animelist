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
    How to use: color: ${({ theme }) => theme.color.persianGreen};
*/
export const color = {
  color: {
    slateBlue: "SlateBlue",
    aliceBlue: "aliceBlue",
    white: "#FFFFFF",
    warning: "#dc3545",
  },
};

// Default colors font, etc for Dark/Light mode
export const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme.body};
        // W: SlateBlue / B: aliceBlue */
        color: ${({ theme }) => theme.fontColor};
        // W: DarkSlateBlue / B: DarkOrange
        fill: ${({ theme }) => theme.fill}; 
    }
`;

/* 
    Used in app.tsx. All the descendants of App will have access to the theme object.
    src: https://dev.to/aromanarguello/how-to-use-themes-in-styled-components-49h 
*/
const ThemeContextProvider = ({ children }) => (
  <ThemeProvider theme={color}>{children}</ThemeProvider>
);

export default ThemeContextProvider;
