import styled from "styled-components";
import {
  DefaultButtonStyleType,
  DefaultButtonType,
} from "./types/DefaultButtonType";

const DefaultButtonStyle = styled.button<DefaultButtonStyleType>`
  padding: 4px 6px;
  border: ${({ bordered }) =>
    bordered ? "2px solid lightgray" : "2px solid transparent"};
  border-radius: ${({ rounded }) => (rounded ? `${"8px"}` : null)};

  &:hover {
    cursor: pointer;
  }
`;

// To align icon with title
const DefaultButtonContent = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DefaultButton: React.FunctionComponent<DefaultButtonType> = ({
  children,
  className,
  icon,
  onClick,
  rounded,
  bordered = true,
}) => {
  return (
    <DefaultButtonStyle
      rounded={rounded}
      bordered={bordered}
      onClick={onClick}
      className={className}
    >
      <DefaultButtonContent>
        {icon}
        {children}
      </DefaultButtonContent>
    </DefaultButtonStyle>
  );
};

export default DefaultButton;
