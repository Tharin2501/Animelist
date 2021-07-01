import CardContainer from "./components/card/CardContainer";
import NavigationBar from "./components/navigationbar/NavigationBar";
require("dotenv").config();
// API: https://jikan.docs.apiary.io/#reference
const App = () => {
  return (
    <>
      <NavigationBar />
      <CardContainer />
    </>
  );
};

export default App;
