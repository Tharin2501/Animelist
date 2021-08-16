import { ApiDataType } from "./card/types/CardType";
import { useState, useCallback } from "react";
import Synopsis from "./synopsis/Synopsis";
import DefaultButton from "./button/DefaultButton";
import styled from "styled-components";

const StyledDefaultButton = styled(DefaultButton)`
  margin: 3px;
  padding: 2px 4px;
  border: 1px solid lightgrey;
  border-radius: 3px;
  color: slateBlue;
  &:hover {
    border: 1px solid slateBlue;
    cursor: pointer;
  }
  background-color: ${({ active }) => (active ? "slateBlue" : null)};
  color: ${({ active }) => (active ? "white" : null)};
`;

const TitleButtonGroup: React.FunctionComponent<ApiDataType> = ({
  filteredData,
}) => {
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [actualAnime, setActualAnime] = useState<string[]>([]);
  const [toggleSynopsis, setToggleSynopsis] = useState(false);

  const fetchAnimeById = useCallback((id: number) => {
    fetch(`https://api.jikan.moe/v3/anime/${id}`) // need to pass id after anime/id here -> anime/42938
      .then((response) => response.json())
      .then((data) => {
        console.log(data.synopsis);
        setActualAnime(data.synopsis);
        setToggleSynopsis(true);
      });
  }, []);

  const handleOnClick = (id: number) => {
    setActiveButton(id);
    console.log(id);
    return fetchAnimeById(id);
  };

  const ButtonGroup = ({ filteredData }: ApiDataType) => {
    const listButtons = filteredData?.map((item) => (
      <StyledDefaultButton
        key={item.mal_id}
        active={activeButton === item.mal_id ? true : false}
        onClick={() => handleOnClick(item.mal_id!)}
      >
        {item.title}
      </StyledDefaultButton>
    ));
    return <ul>{listButtons}</ul>;
  };

  return (
    <>
      <Synopsis
        toggleSynopsis={toggleSynopsis}
        actualAnime={actualAnime}
        setToggleSynopsis={setToggleSynopsis}
      />
      <ButtonGroup filteredData={filteredData} />
    </>
  );
};

export default TitleButtonGroup;
