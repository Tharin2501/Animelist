import CardContainer from "./components/card/CardContainer";
import ThemeContextProvider, { GlobalStyles } from "./themes/themes";
require("dotenv").config();
// API: https://jikan.docs.apiary.io/#reference
const App = () => {
  return (
    <ThemeContextProvider>
      <GlobalStyles />
      <CardContainer />
    </ThemeContextProvider>
  );
};

export default App;
