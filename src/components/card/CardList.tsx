import React, { useEffect, useRef, useState } from "react";
import Styled from "styled-components";
import Card from "./Card";
import { ApiDataType, CardType } from "./types/CardType";

// API:   https://jikan.docs.apiary.io/#reference
const FlexContainer = Styled.span`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border: 1px solid blue;
`;

const Synopsis = Styled.span`
  border: 3px solid green;
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
const CardList: React.FunctionComponent<ApiDataType> = () => {
  // apiData is defined as a ApiDataType[] (string, number) and initialized as a empty array([])
  const [apiData, setApiData] = useState<ApiDataType[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [actualAnime, setActualAnime] = useState<any>([]);
  const [myId, setMyId] = useState<any>(["array3"]);

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

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
    return setSearchTerm(event.currentTarget.value); // currentTarget = element that has the event listener(input).
  };

  const cardList = apiData
    .filter((item) => {
      if (item.title?.toLowerCase().includes(searchTerm.toLowerCase())) {
        // ? -> optional chaining/safe navigation operator to fix obj possibly undefined
        return item;
      }
      return null;
    })
    .map((item) => {
      return (
        <>
          <Card key={item.mal_id} item={item}></Card>
        </>
      );
    });

  // src: https://stackoverflow.com/questions/19590865/from-an-array-of-objects-extract-value-of-a-property-as-array
  function GetMalIdFromCards(input: any, field: any) {
    var output: any[] = [];
    /*
    input.map((output: { mal_id: any }) => {
      JSON.stringify(output.mal_id);
      console.log(output.mal_id);
      setMyId(output.mal_id);
    });
    */
    for (var i = 0; i < input.length; ++i) output.push(input[i][field]);

    return output;

    //var result = GetMalIdFromCards(apiData, "mal_id"); // henter id
    //console.log(result);
  }
  const result = GetMalIdFromCards(apiData, "mal_id"); // array1
  //console.log(myId); // array 2
  const array3 = result.concat(myId); // add state to array3
  console.log(array3); // DETTE er alle id for alle anime. `https://api.jikan.moe/v3/anime/${id}`

  function getAnimeByProvidedId(id: any) {
    fetch(`https://api.jikan.moe/v3/anime/${id}`) // need to pass id after anime/id here -> anime/42938
      .then((response) => response.json())
      .then(function (data) {
        console.log(data.synopsis);
        setActualAnime(data.synopsis);
      });
  }

  // TODO: PASS array3(Child) to
  // r is the variable for the id of the individual anime

  const listOfIds = array3.map((r) => {
    return (
      <Synopsis onClick={() => getAnimeByProvidedId(r)}>
        {`link to JSON ${r}`}
      </Synopsis>
    );
  });

  return (
    <>
      {actualAnime}
      {listOfIds}
      <form autoComplete="off">
        <label htmlFor="searchbar">add logo</label>
        <input
          id="searchbar"
          type="text"
          placeholder="Search..."
          ref={inputRef}
          value={searchTerm}
          onChange={handleOnChange}
        ></input>
      </form>

      <FlexContainer>
        {cardList}
        <StyledMockCard>Last 1/2</StyledMockCard>
        <StyledMockCard>Last 2/2</StyledMockCard>
      </FlexContainer>
    </>
  );
};

export default CardList;
