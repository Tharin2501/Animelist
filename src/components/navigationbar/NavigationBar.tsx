import React from "react";
import styled from "styled-components";
import NavigaitonBarType from "./types/NavigationBarType";

const FlexUl = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
  // border: 1px solid red;
  background-color: snow;
`;

const Title = styled.li`
  margin-right: auto;
  padding-left: 6px;
  // border: 1px solid blue;
  &:hover {
    cursor: pointer;
  }
`;

const ListItem = styled.li`
  padding-left: 6px;
  padding-right: 6px;
  &:hover {
    cursor: pointer;
    border-bottom: 2px solid orange;
    margin-bottom: -2px; // border adds 2px to box model, this prevents it from moving the element.
  }
`;

// role=navigation for accesibility.
export const NavigationBarItems: React.FunctionComponent<NavigaitonBarType> = ({
  children,
  title,
}) => {
  return (
    <FlexUl role="navigation">
      <Title>{title}</Title>
      {children}
    </FlexUl>
  );
};

const NavigationBar = () => {
  return (
    <>
      <NavigationBarItems title={<span>Title/Icon</span>}>
        <ListItem>Favorites (star icon)</ListItem>
        <ListItem>About</ListItem>
        <ListItem>item3</ListItem>
      </NavigationBarItems>
    </>
  );
};

export default NavigationBar;
