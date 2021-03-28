import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import CardType, { ApiDataType } from "./types/CardType";

// API:    https://jikan.docs.apiary.io/#reference

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
display: block;
    color: whiteSmoke;
`;

const StyledFooter = Styled.span`

`;

const StyledUnorderedList = Styled.ul`
 list-style-type: none;
 margin: 0;
 padding: 0;
`;

// https://www.smashingmagazine.com/2020/06/rest-api-react-fetch-axios/  first param: id of anime in myanimelist url path.
const Card: React.FunctionComponent<CardType> = ({
  title,
  description,
  children,
}) => {
  // apiData is defined as a ApiDataType[] (string, number) and initialized as a empty array
  const [apiData, setApiData] = useState<ApiDataType[]>([]);

  useEffect(() => {
    fetch("https://api.jikan.moe/v3/top/anime/1/airing")
      .then((response) => response.json())
      .then((data) => setApiData(data.top));
  }, []);

  console.log(apiData);
  return (
    <Wrapper>
      {/*}
      <StyledCard>
        <StyledMedia>media</StyledMedia>
        <StyledTitle>{title}</StyledTitle>
        <StyledDescription>{description}</StyledDescription>
        <StyledFooter>footer</StyledFooter>
      </StyledCard>
      /*}
      {children}
      {/* TODO: add more styling here + grid with flexbox*/}
      {apiData.map((item) => {
        return (
          <StyledCard>
            <StyledUnorderedList>
              <li key={item.mal_id}>
                <StyledMedia>media</StyledMedia>
                <StyledTitle>{item.title} </StyledTitle>
                <StyledDescription>{description}</StyledDescription>
                <StyledFooter>footer</StyledFooter>
              </li>
            </StyledUnorderedList>
          </StyledCard>
        );
      })}
    </Wrapper>
  );
};

export default Card;
