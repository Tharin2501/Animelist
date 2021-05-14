import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import Card from "./card/Card";
import { ApiDataType } from "./card/types/CardType";
import Styled from "styled-components";

// TODO: This is the same as CardList.tsx, just without the useEffect.
// Refeactor CardList -> CardContainer or CardListContainer. Refactor Child to CardList
// Delete commented out stuff in CardList
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

const CardList: FunctionComponent<ApiDataType> = ({ data }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Pass item as param to Card component as props. ? -> safe navigation operator
  const FilteredCardList = () => {
    const mappedCards = data
      .filter((item: ApiDataType) => {
        if (item.title!.toLowerCase().includes(searchTerm.toLowerCase())) {
          return item;
        }
        return null;
      })
      .map((item: ApiDataType) => {
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

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
    return setSearchTerm(event.currentTarget.value); // currentTarget = element that has the event listener(input).
  };

  // with the initial value of a ref being null, inputRef might be null. TypeScript complains that you should do a strict null check.
  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);

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
