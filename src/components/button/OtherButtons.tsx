import styled from "styled-components";
import { Close } from "@styled-icons/evaicons-solid/Close";

type ButtonType = {
  active?: boolean;
};

//src: https://stackoverflow.com/questions/61348213/how-to-change-background-color-of-button-using-react
// TODO: Maybe use DefaultButton instead of this?
export const Button = styled.button<ButtonType>`
  margin: 3px;
  padding: 2px 4px;
  border: 1px solid lightgrey;
  border-radius: 3px;
  color: slateBlue;
  &:hover {
    border: 1px solid slateBlue;
    cursor: pointer;
  }
  background-color: ${(props) => (props.active ? "slateBlue" : null)};
  color: ${(props) => (props.active ? "white" : null)};
`;

// Close button
export const CloseButton = styled(Close)`
  border: 1px solid black;
  border-radius: 3px;
  padding: 3px;
  transition: 0.6s;
  &:hover {
    cursor: pointer;
    background: tomato;
    color: white;
  }
`;
