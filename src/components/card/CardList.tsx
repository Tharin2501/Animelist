import React, { useEffect, useRef, useState } from "react";
import Styled from "styled-components";
import Card from "./Card";
import { ApiDataType } from "./types/CardType";

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
  // apiData is defined as a ApiDataType[] and initialized as a empty array([])
  const [apiData, setApiData] = useState<ApiDataType[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

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
    // with the initial value of a ref being null, inputRef might be null. TypeScript complains that you should do a strict null check.
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
    return setSearchTerm(event.currentTarget.value); // currentTarget = element that has the event listener(input).
  };

  // Pass item as param to Card component as props.
  const FilteredCardList = () => {
    const mappedCards = apiData
      .filter((item) => {
        if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          return item;
        }
        return null;
      })
      .map((item) => {
        return <Card key={item.mal_id} item={item} />;
      });
    return (
      <FlexContainer>
        {mappedCards}
        <StyledMockCard>Last 1/2</StyledMockCard>
        <StyledMockCard>Last 2/2</StyledMockCard>
      </FlexContainer>
    );
  };

  return (
    <>
      <form autoComplete="off">
        <label>
          add logo
          <input
            type="text"
            placeholder="Search..."
            ref={inputRef}
            value={searchTerm}
            onChange={handleOnChange}
          ></input>
        </label>
      </form>
      <FilteredCardList />
    </>
  );
};

export default CardList;
