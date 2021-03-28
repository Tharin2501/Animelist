import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import CardType, { ApiDataType } from "./types/CardType";

// API:   https://jikan.docs.apiary.io/#reference

const Wrapper = Styled.div`
    max-width: 250px;
    padding-left: 16px;
    padding-right: 16px;
    border: 1px solid red;
       // positioning
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledCard = Styled.div`
    // styling
    width: 200px;
    border-radius: 5px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
    background-color: white;
    cursor: pointer;
`;

const StyledUnorderedList = Styled.ul`
 list-style-type: none;
 margin: 0;
 padding: 0;
`;

// https://www.smashingmagazine.com/2020/06/rest-api-react-fetch-axios/  first param: id of anime in myanimelist url path.
const Card: React.FunctionComponent<React.ReactNode> = () => {
  // apiData is defined as a ApiDataType[] (string, number) and initialized as a empty array
  const [apiData, setApiData] = useState<ApiDataType[]>([]);

  useEffect(() => {
    fetch("https://api.jikan.moe/v3/top/anime/1/airing")
      .then((response) => response.json())
      .then((data) => setApiData(data.top));
  }, []);

  console.log(apiData);

  return (
    <React.Fragment>
      {apiData.map((item) => {
        return (
          <Wrapper>
            <StyledCard>
              <StyledUnorderedList>
                <li key={item.mal_id}>
                  <img
                    style={{ width: "100%", height: "50%" }}
                    src={item.image_url}
                    alt={item.title}
                  ></img>
                  <h1>{item.title} </h1>
                  <p>description here</p>
                </li>
              </StyledUnorderedList>
            </StyledCard>
          </Wrapper>
        );
      })}
    </React.Fragment>
  );
};

export default Card;
