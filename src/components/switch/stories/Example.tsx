import { useState } from "react";
import Switch from "../Switch";
import { BsCheck } from "react-icons/bs";

// Use this to imitate usage of our component
const Example = () => {
  const [checked, setChecked] = useState(false);
  const [checkedIcon, setCheckedIcon] = useState(true);
  const [unChecked, setUnchecked] = useState(false);

  return (
    <>
      <p>Checked</p>
      <Switch isChecked={!checked} onChange={() => setChecked(!checked)} />
      <p>With Icon</p>
      <Switch
        isChecked={checkedIcon}
        icon={<BsCheck />}
        onChange={() => setCheckedIcon(!checkedIcon)}
      />
      <p>Unchecked</p>
      <Switch isChecked={unChecked} onChange={() => setUnchecked(!unChecked)} />
    </>
  );
};

export default Example;
