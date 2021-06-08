import { ApiDataType } from "./card/types/CardType";
import Styled from "styled-components";
import React, { useState } from "react";
import { Button } from "./button/Button";

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
