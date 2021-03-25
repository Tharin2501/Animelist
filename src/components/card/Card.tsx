import React from "react";
import Styled from "styled-components";
import CardType from "./types/CardType";

const Wrapper = Styled.div`
    max-width: 250px;
    padding-left: 16px;
    padding-right: 16px;
    border: 1px solid red;
    // center ? margin auto
    
`;

const StyledCard = Styled.div`
    // styling
    width: 200px;
    border-radius: 5px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
    background-color: white;
    // positioning
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    // when hovering TODO: display border gold when hovering
    cursor: pointer;
`;

const StyledMedia = Styled.div`
    width: 100%; // do i want it resize 100% ? or fixed?
    // height ?
    background-color: lightGrey;
    border: 1px solid blue;
`;

const StyledTitle = Styled.h2``;

const StyledDescription = Styled.span`
    color: whiteSmoke;
`;

const StyledFooter = Styled.span`
`;

const Card: React.FunctionComponent<CardType> = ({
  title,
  description,
  children,
}) => {
  return (
    <Wrapper>
      <StyledCard>
        <StyledMedia>media</StyledMedia>
        <StyledTitle>{title}</StyledTitle>
        <StyledDescription>{description}</StyledDescription>
        <StyledFooter></StyledFooter>
      </StyledCard>
      {children}
    </Wrapper>
  );
};

export default Card;
