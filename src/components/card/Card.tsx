import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import { ApiDataType } from "./types/CardType";

// API:   https://jikan.docs.apiary.io/#reference

const Wrapper = Styled.div`
    max-width: 250px;
    max-height: 600px;
    padding-left: 16px;
    padding-right: 16px;
    border: 1px solid red;
`;

const FlexContainer = Styled.span`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StyledCard = Styled.div`
    width: 200px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
    background-color: white;
    cursor: pointer;
`;

const StyledUnorderedList = Styled.ul`
 list-style-type: none;
 margin: 0;
 padding: 0;
`;

// src: https://travishorn.com/some-ways-to-align-the-last-row-in-a-flexbox-grid-720f365dcb16
const StyledMockCard = Styled.span`
  width: 200px;
  padding: 37px; // 16px wrapper + 20px card + 1px border = 37px
  visibility: hidden;
`;

// https://www.smashingmagazine.com/2020/06/rest-api-react-fetch-axios/  first param: id of anime in myanimelist url path.
const Card: React.FunctionComponent<React.ReactNode> = () => {
  // apiData is defined as a ApiDataType[] (string, number) and initialized as a empty array
  const [apiData, setApiData] = useState<ApiDataType[]>([]);

  useEffect(() => {
    fetch("https://api.jikan.moe/v3/top/anime/1/airing")
      .then((response) => response.json())
      .then((data) => setApiData(data.top));
  }, []);

  console.log(apiData);

  return (
    <FlexContainer>
      {apiData.map((item) => {
        return (
          <Wrapper key={item.mal_id}>
            <StyledCard>
              <StyledUnorderedList>
                <li>
                  <img
                    style={{ width: "100%", height: "50%" }}
                    src={item.image_url}
                    alt={item.title}
                  ></img>
                  <h5>{item.title} </h5>
                  <p>description here</p>
                </li>
              </StyledUnorderedList>
            </StyledCard>
          </Wrapper>
        );
      })}
      <StyledMockCard>Mock card</StyledMockCard>
      <StyledMockCard>Mock card</StyledMockCard>
    </FlexContainer>
  );
};

export default Card;
