import Styled from "styled-components";

type ButtonType = {
  active?: boolean;
};

//src: https://stackoverflow.com/questions/61348213/how-to-change-background-color-of-button-using-react
export const Button = Styled.button<ButtonType>`
  margin: 3px;
  padding: 2px 4px;
  border: 1px solid lightgrey;
  border-radius: 3px;
  color: slateBlue;
  cursor: pointer;
  &:hover {
    border: 1px solid slateBlue;
  }
  background-color: ${(props) => (props.active ? "slateBlue" : null)};
   color:${(props) => (props.active ? "white" : null)};
`;
