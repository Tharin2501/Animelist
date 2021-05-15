import React, { useEffect, useRef, useState } from "react";
import Styled from "styled-components";
import Card from "./Card";
import { ApiDataType, CardType } from "./types/CardType";

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
const CardList: React.FunctionComponent<ApiDataType> = () => {
  // apiData is defined as a ApiDataType[] (string, number) and initialized as a empty array([])
  const [apiData, setApiData] = useState<ApiDataType[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

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
      return <Card key={item.mal_id} item={item}></Card>;
    });

  // onClick that returns all mal_id. focus on the onClick under.
  const handleOnClick = () => {
    apiData.map((item) => {
      console.log(item.mal_id);
      return item.mal_id;
    });
  };

  // mock of apiData
  let test_data = [
    {
      id: 42938, // this is mal_id
      title: "This is the test information",
      test_score: 1,
    },
    {
      id: "Test02", //Has to be a string form ID, fixed: i stringifyed it lol.
      title: "This is the test information",
      test_score: 2,
    },
  ];

  // Provide the id as param and returns the title the id is associated with.
  // TODO: Might have to do the opposite. provide the title and returns the id.  need to use apidata instead of mock
  // src: https://stackoverflow.com/questions/53734705/javascript-find-object-by-id-in-an-array-of-javascript-objects-then-get-anothe
  const found = (id: any) => {
    JSON.stringify(id);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    let x = test_data.find((t) => t.id === id)?.title; // find title field from id
    console.log(x);
  };

  /* TODO: 
    GOAL: return the specific anime object when clicking a card. Then, Use the id from that object to make a get request to 
          f.eks https://api.jikan.moe/v3/anime/42938 (synopsis is there).

     - fiks found see todo there.
     - when we click this button we need to make an API request to https://api.jikan.moe/v3/anime/42938 (last path is id)
     maybe useEffect? and prefix https://api.jikan.moe/v3/anime/`${id}` hopefully we get the whole object
     - When we have the object for 
  */
  const handleOnClickTest = () => {
    return found(42938);
  };

  return (
    <>
      <button onClick={handleOnClickTest}>Click me and open console</button>
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
      <FlexContainer /*onClick={handleOnClick} */>
        {cardList}
        <StyledMockCard>Last 1/2</StyledMockCard>
        <StyledMockCard>Last 2/2</StyledMockCard>
      </FlexContainer>
    </>
  );
};

export default CardList;
