import { ApiDataType } from "./card/types/CardType";
import Styled from "styled-components";
import React, { useState } from "react";

type ButtonType = {
  active: boolean;
};

//src: https://stackoverflow.com/questions/61348213/how-to-change-background-color-of-button-using-react
const Button = Styled.button<ButtonType>`
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

const SynopsisWrapper = Styled.div`
  padding: 6px;
`;

const TitleButtonGroup: React.FunctionComponent<ApiDataType> = ({ data }) => {
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [actualAnime, setActualAnime] = useState<string[]>([]);

  const fetchAnimeById = React.useCallback((id: number) => {
    fetch(`https://api.jikan.moe/v3/anime/${id}`) // need to pass id after anime/id here -> anime/42938
      .then((response) => response.json())
      .then((data) => {
        console.log(data.synopsis);
        setActualAnime(data.synopsis);
      });
  }, []);

  const handleOnClick = (id: number) => {
    setActiveButton(id);
    console.log(id);
    return fetchAnimeById(id);
  };

  const ButtonGroup = ({ data }: ApiDataType) => {
    const listButtons = data?.map((item) => (
      <Button
        key={item.mal_id}
        active={activeButton === item.mal_id ? true : false}
        onClick={() => handleOnClick(item.mal_id!)}
      >
        {item.title}
      </Button>
    ));
    return <ul>{listButtons}</ul>;
  };

  return (
    <>
      <SynopsisWrapper>{actualAnime}</SynopsisWrapper>
      <ButtonGroup data={data} />
    </>
  );
};

export default TitleButtonGroup;
