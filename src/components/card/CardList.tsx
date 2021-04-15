import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import Card from "./Card";
import { ApiDataType } from "./types/CardType";
// TODO: key prop error in CardList. commit these changes to another branch and pull req
// API:   https://jikan.docs.apiary.io/#reference
const FlexContainer = Styled.span`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

// src: https://travishorn.com/some-ways-to-align-the-last-row-in-a-flexbox-grid-720f365dcb16
const StyledMockCard = Styled.span`
  width: 200px;
  padding: 37px; // 16px wrapper + 20px card + 1px border = 37px
  visibility: hidden;
`;

// https://www.smashingmagazine.com/2020/06/rest-api-react-fetch-axios/  first param: id of anime in myanimelist url path.
const CardList: React.FunctionComponent<React.ReactNode> = () => {
  // apiData is defined as a ApiDataType[] (string, number) and initialized as a empty array([])
  const [apiData, setApiData] = useState<ApiDataType[]>([]);

  // Source: https://dmitripavlutin.com/javascript-fetch-async-await/
  // As long as dependecny array[] is empty, run only once, and dont run again.
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.jikan.moe/v3/top/anime/1/airing"
      );
      const data = await response.json();
      // Fetch does not handle errors.
      if (!response.ok) {
        throw new Error(`${response.status + " " + response.statusText}`);
      }
      console.log(data.top);
      setApiData(data.top);
    };
    fetchData();
  }, []);

  const cardList = apiData.map((item) => {
    return <Card key={item.mal_id} item={item}></Card>;
  });

  return (
    <FlexContainer>
      {cardList}
      <StyledMockCard>Last 1/2</StyledMockCard>
      <StyledMockCard>Last 2/2</StyledMockCard>
    </FlexContainer>
  );
};

export default CardList;
