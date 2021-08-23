import styled from "styled-components";
import SwitchType from "./types/SwitchType";
import { BsCheck } from "react-icons/bs";

const Wrapper = styled.div``;

const HideNativeCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

const Icon = styled(BsCheck)`
  color: Cyan;
`;

type StyledCheckboxType = {
  checked: boolean;
};

const StyledCheckbox = styled.div<StyledCheckboxType>`
  width: 16px;
  height: 16px;
  background: ${({ checked }) => (checked ? "darkSlateBlue" : "slateblue")};
  border-radius: 10px;
  ${Icon} {
    visibility: ${({ checked }) => (checked ? "visible" : "hidden")};
  }
  :hover {
    cursor: pointer;
  }
`;

const Switch: React.FunctionComponent<SwitchType> = ({
  children,
  isChecked,
  onChange,
}) => {
  return (
    <>
      <label>
        <HideNativeCheckbox checked={isChecked} onChange={onChange} />
        <StyledCheckbox checked={isChecked}>
          <Icon />
        </StyledCheckbox>
      </label>
    </>
  );
};

export default Switch;
