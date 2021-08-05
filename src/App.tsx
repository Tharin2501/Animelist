import CardContainer from "./components/card/CardContainer";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./themes/themes";
require("dotenv").config();
// API: https://jikan.docs.apiary.io/#reference
const App = () => {
  /* 1. create file, themeToggler.tsx. copy this code there.
     2. Pass theme state as props to app. <Themeprovider theme{theme}/>
  */
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return <CardContainer />;
};

export default App;
