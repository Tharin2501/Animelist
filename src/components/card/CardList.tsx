import React, { useEffect, useRef, useState } from "react";
import Styled from "styled-components";
import Card from "./Card";
import { ApiDataType } from "./types/CardType";
import { FiSearch } from "react-icons/fi";

// API:  https://jikan.docs.apiary.io/#reference
const ContentContainer = Styled.span`
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

const SearchContainer = Styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 16px;
`;

const CardList: React.FunctionComponent<ApiDataType> = ({ data }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // with the initial value of a ref being null, inputRef might be null. TypeScript complains that you should do a strict null check.
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
    return setSearchTerm(event.currentTarget.value); // currentTarget = element that has the event listener(input).
  };

  /*
   Currently unused, might find a use case for this function later
   src: https://stackoverflow.com/questions/19590865/from-an-array-of-objects-extract-value-of-a-property-as-array
  */
  function GetMalId(input: any, field: any) {
    let output: any[] = [];

    for (var i = 0; i < input.length; ++i) output.push(input[i][field]);

    return output;
  }

  const CardList = ({ data }: ApiDataType) => {
    const listCards = data
      .filter((item) => {
        if (
          item.title?.toLocaleLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return item;
        }
        return null;
      })
      .map((item) => {
        return <Card key={item.mal_id} item={item} />;
      });
    return <>{listCards}</>;
  };

  const searchFilter = () => {
    return (
      <form autoComplete="off">
        <SearchContainer>
          <label htmlFor="searchbar" style={{ paddingRight: "6px" }}>
            <FiSearch size={20} />
          </label>
          <input
            id="searchbar"
            type="text"
            placeholder="Search..."
            ref={inputRef}
            value={searchTerm}
            onChange={handleOnChange}
          ></input>
        </SearchContainer>
      </form>
    );
  };

  return (
    <>
      {/* les detta https://dev.to/igor_bykov/react-calling-functional-components-as-functions-1d3l */}
      {searchFilter()}

      <ContentContainer>
        <CardList data={data} />
        <StyledMockCard>Last 1/2</StyledMockCard>
        <StyledMockCard>Last 2/2</StyledMockCard>
      </ContentContainer>
    </>
  );
};

export default CardList;
