import { useCallback } from "react";
import Styled from "styled-components";
import { CardType } from "./types/CardType";

const Wrapper = Styled.div`
    max-width: 250px;
    max-height: 550px;
    padding: 16px;
    border: 1px solid red;
`;

const StyledCard = Styled.div`
    width: 200px;
    height: 450px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
    background-color: white;
   // cursor: pointer;
`;

const StyledUnorderedList = Styled.ul`
 list-style-type: none;
 margin: 0;
 padding: 0;
`;

const StyledImages = Styled.img`
  max-width: 100%; // width of the image won’t exceed the width of its parent (200px) 
  min-height: 300px;
`;

const FlexColumn = Styled.span`
  display: flex;
  flex-direction: column;
`;

const Card: React.FunctionComponent<CardType> = ({ item }) => {
  const fetchAnimeById = useCallback((id: number) => {
    fetch(`https://api.jikan.moe/v3/anime/${id}`) // need to pass id after anime/id here -> anime/42938
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  // TODO:  POST to http://localhost:3001/api/insert
  const handleOnClick = (id: number) => {
    return fetchAnimeById(id);
  };

  return (
    <Wrapper>
      <StyledCard>
        <StyledUnorderedList>
          <li key={item.mal_id}>
            <StyledImages src={item.image_url} alt={item.title}></StyledImages>
            <FlexColumn>
              <h3>{item.title}</h3>
              <span>Score: {item.score}</span>
              <span>Start date: {item.start_date}</span>
              {item.end_date ? <span>End date: {item.end_date}</span> : null}
              <button onClick={() => handleOnClick(item.mal_id!)}>
                Add to favorites
              </button>
            </FlexColumn>
          </li>
        </StyledUnorderedList>
      </StyledCard>
    </Wrapper>
  );
};

export default Card;
