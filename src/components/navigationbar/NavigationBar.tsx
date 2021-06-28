import React from "react";
import styled from "styled-components";
import NavigaitonBarType from "./types/NavigationBarType";
import { FiStar, FiInfo } from "react-icons/fi";
import { GiNoodles } from "react-icons/gi";
import { IoIosContact } from "react-icons/io";

const FlexUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 6px;
  background-color: snow;
  // screen larger than 320px
  @media (min-width: 320px) {
    justify-content: flex-end;
  }
`;

const TitleWrapper = styled.li`
  margin-right: auto;
  padding-left: 6px;
  display: flex;
  &:hover {
    cursor: pointer;
  }
`;

const StyledTitle = styled.h1`
  margin: 0;
  display: flex;
  align-items: center;
  color: slateblue;
`;

const StyledHomeIcon = styled(GiNoodles)`
  ${StyledTitle}:hover & {
    fill: darkslateblue;
  }
`;

const ListItem = styled.li`
  padding-left: 6px;
  padding-right: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: slateblue;
  &:hover {
    cursor: pointer;
    border-bottom: 2px solid orange;
    margin-bottom: -2px; // border adds 2px to box model, this prevents it from moving the element.
  }
`;

// ICONS STYLE
// Hovering parent changes style, will only work if ListItem is defined above/before StyledStarIcon
const StyledStarIcon = styled(FiStar)`
  padding-left: 3px;
  fill: slateblue;
  ${ListItem}:hover & {
    fill: orange;
  }
`;
const StyledAboutIcon = styled(FiInfo)`
  padding-left: 3px;
  ${ListItem}:hover & {
    fill: orange;
  }
`;
const StyledInfoIcon = styled(IoIosContact)`
  padding-left: 3px;
  ${ListItem}:hover & {
    fill: orange;
  }
`;
// END OF ICON STYLES

// role=navigation for accesibility.
export const NavigationBarItems: React.FunctionComponent<NavigaitonBarType> = ({
  children,
  title,
}) => {
  return (
    <FlexUl role="navigation">
      <TitleWrapper>{title}</TitleWrapper>
      {children}
    </FlexUl>
  );
};

const NavigationBar = () => {
  return (
    <>
      <NavigationBarItems
        title={
          <StyledTitle title="Animelist">
            <StyledHomeIcon size={30} />
            Animelist
          </StyledTitle>
        }
      >
        <ListItem title="Favorites">
          Favorites <StyledStarIcon />
        </ListItem>
        <ListItem title="About">
          About <StyledAboutIcon />
        </ListItem>
        <ListItem title="Contact">
          Contact <StyledInfoIcon />
        </ListItem>
      </NavigationBarItems>
    </>
  );
};

export default NavigationBar;
