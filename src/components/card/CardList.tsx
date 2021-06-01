import React, { useEffect, useRef, useState } from "react";
import Styled from "styled-components";
import Card from "./Card";
import { ApiDataType } from "./types/CardType";

// API:  https://jikan.docs.apiary.io/#reference
const ContentContainer = Styled.span`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SynopsisWrapper = Styled.div`
  border: 1px solid red;
  padding: 6px;
`;

const ButtonGroupWrapper = Styled.div`
  border: 1px solid blue;
`;

//src: https://stackoverflow.com/questions/61348213/how-to-change-background-color-of-button-using-react
const Button = Styled.button<{ active?: boolean }>`
  margin: 3px;
  padding: 2px 4px;
  border: 1px solid lightgrey;
  border-radius: 3px;
  color: slateBlue;
  cursor: pointer;
  &:hover {
    border: 1px solid slateBlue;
  }
  background-color: ${(props) => (props.active ? "slateBlue" : null)};
  color:${(props) => (props.active ? "white" : null)};
`;

// src: https://travishorn.com/some-ways-to-align-the-last-row-in-a-flexbox-grid-720f365dcb16
const StyledMockCard = Styled.span`
  width: 200px;
  padding: 37px; // 16px wrapper + 20px card + 1px border = 37px
  visibility: hidden;
`;

const CardList: React.FunctionComponent<ApiDataType> = ({ data }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [actualAnime, setActualAnime] = useState<string[]>([]);
  const [myId, setMyId] = useState<any>([{}]);
  const [activeButton, setActiveButton] = useState<number | null>(null);

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

  const fetchAnimeById = React.useCallback((id: any) => {
    fetch(`https://api.jikan.moe/v3/anime/${id}`) // need to pass id after anime/id here -> anime/42938
      .then((response) => response.json())
      .then((data) => {
        console.log(data.mal_id);
        console.log(data.synopsis);
        setMyId(data.mal_id);
        setActualAnime(data.synopsis);
      });
  }, []);

  const TitleButtonGroup = () => {
    const buttonGroup = data?.map((item, index) => {
      const SelectSynopsis = () => {
        setActiveButton(index);
        return fetchAnimeById(item.mal_id!);
      };
      return (
        <Button
          onClick={SelectSynopsis}
          active={activeButton === index ? true : false}
        >
          {item.title}
        </Button>
      );
    });
    console.log(activeButton);
    return (
      <>
        <SynopsisWrapper>{actualAnime}</SynopsisWrapper>
        {buttonGroup}
      </>
    );
  };

  const cardList = data
    ?.filter((item) => {
      // ? -> optional chaining/safe navigation operator to fix obj possibly undefined
      if (item.title?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return item;
      }
      return null;
    })
    .map((item) => {
      return <Card key={item.mal_id} item={item}></Card>;
    });

  return (
    <>
      <ButtonGroupWrapper>
        <TitleButtonGroup />
      </ButtonGroupWrapper>
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
      <ContentContainer>
        {cardList}
        <StyledMockCard>Last 1/2</StyledMockCard>
        <StyledMockCard>Last 2/2</StyledMockCard>
      </ContentContainer>
    </>
  );
};

export default CardList;
