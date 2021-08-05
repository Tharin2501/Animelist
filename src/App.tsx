import CardContainer from "./components/card/CardContainer";
import Theme from "./themes/themes";
require("dotenv").config();
// API: https://jikan.docs.apiary.io/#reference
const App = () => {
  return (
    <Theme>
      <CardContainer />
    </Theme>
  );
};

export default App;
