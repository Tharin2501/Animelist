import styled from "styled-components";
import { SwitchType, StyledCheckboxType } from "./types/SwitchType";

const Wrapper = styled.div``;

const HideNativeCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

const StyledLabel = styled.label<StyledCheckboxType>`
  width: 50px;
  height: 25px;
  background-color: ${({ checked }) =>
    checked ? "mediumspringgreen" : "#e6e6e6"};
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: ${({ checked }) => (checked ? "flex-end" : "flex-start")};
  transition: background-color 0.1s ease-in-out;

  &:hover {
    cursor: pointer;
  }
`;

const StyledCheckbox = styled.div<StyledCheckboxType>`
  width: 20px;
  height: 20px;
  background: ${({ checked }) => (checked ? "slateblue" : "darkSlateBlue")};
  border-radius: 10px;
  margin: 0px 2px 0px 2px;
  &:hover {
    cursor: pointer;
  }
`;

const IconWrapper = styled.span<StyledCheckboxType>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  color: white;
  visibility: ${({ checked }) => (checked ? "visible" : "hidden")};
`;

const Switch: React.FunctionComponent<SwitchType> = ({
  children,
  isChecked,
  onChange,
  icon,
}) => {
  return (
    <>
      <StyledLabel checked={isChecked}>
        <HideNativeCheckbox onChange={onChange} />
        <StyledCheckbox checked={isChecked}>
          <IconWrapper checked={isChecked}>{icon}</IconWrapper>
        </StyledCheckbox>
      </StyledLabel>
    </>
  );
};

export default Switch;
