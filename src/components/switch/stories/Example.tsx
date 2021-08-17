import { useState } from "react";
import Switch from "../Switch";

// Use this to imitate usage of our component
const Example = () => {
  const [checked, setChecked] = useState(true);

  const handleOnChange = () => {
    setChecked(!checked);
  };

  return <Switch isChecked={checked} onChange={handleOnChange}></Switch>;
};

export default Example;
