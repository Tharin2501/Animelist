import styled from "styled-components";
import {
  DefaultButtonStyleType,
  DefaultButtonType,
} from "./types/DefaultButtonType";

const DefaultButtonStyle = styled.button<DefaultButtonStyleType>`
  padding: 4px 6px;
  border: ${(props) =>
    props.bordered ? "2px solid lightgray" : "2px solid transparent"};
  border-radius: ${(props) => {
    if (props.rounded === true) {
      return `${"9px"}`;
    }
  }};
  background-color: ${(props) => props.bgColor};
  color: slateblue;
  &:hover {
    background-color: ${(props) => props.bgColorHover};
    color: white;
    border: 2px solid ${(props) => props.bgColorHover};
    cursor: pointer;
  }
`;

// To align icon with title
const DefaultButtonContent = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DefaultButton: React.FunctionComponent<DefaultButtonType> = ({
  children,
  icon,
  onClick,
  rounded,
  bgColorHover = "slateBlue",
  bgColor = "white",
  bordered = true,
}) => {
  return (
    <DefaultButtonStyle
      bgColor={bgColor}
      bgColorHover={bgColorHover}
      rounded={rounded}
      bordered={bordered}
      onClick={onClick}
    >
      <DefaultButtonContent>
        {icon}
        {children}
      </DefaultButtonContent>
    </DefaultButtonStyle>
  );
};
