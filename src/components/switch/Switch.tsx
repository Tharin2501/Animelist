import styled from "styled-components";
import SwitchType from "./types/SwitchType";

const Wrapper = styled.div``;

const Switch: React.FunctionComponent<SwitchType> = ({
  children,
  isChecked,
  onChange,
}) => {
  return (
    <Wrapper>
      <label htmlFor="switch">
        <input
          type="checkbox"
          name="switch"
          checked={isChecked}
          onChange={onChange}
        />
      </label>
    </Wrapper>
  );
};

export default Switch;
