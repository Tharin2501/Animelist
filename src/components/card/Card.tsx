import { useState } from "react";
import Styled from "styled-components";
import { CardType } from "./types/CardType";
import axios from "axios";

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
  const [name, setName] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGetRequest = async (id: number) => {
    axios
      .get(`https://api.jikan.moe/v3/anime/${id}`)
      .then((response) => {
        setName(response.data.title);
        setIsLoading(true);
      })
      .catch((error) => {
        // handle error
        throw error;
      });
  };

  const handlePostRequest = () => {
    const dto = {
      name: name,
    };
    axios
      .post("http://localhost:3001/api/insert", dto)
      .then(() => console.log(`POST success -> ${name}`))
      .catch((error) => {
        throw error;
      });
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
              {isLoading ? null : (
                <button onClick={() => handleGetRequest(item.mal_id!)}>
                  Add to favorites
                </button>
              )}
              {isLoading ? (
                <button onClick={() => handlePostRequest()}>
                  Are you sure?
                </button>
              ) : null}
            </FlexColumn>
          </li>
        </StyledUnorderedList>
      </StyledCard>
    </Wrapper>
  );
};

export default Card;
