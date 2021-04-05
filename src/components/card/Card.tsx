import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import { ApiDataType } from "./types/CardType";

// API:   https://jikan.docs.apiary.io/#reference
// TODO: image container. comment out title and despcrition and make api image fixed hieght. trenger conmtainer for alt egentlig så start med det
const Wrapper = Styled.div`
    max-width: 250px;
    max-height: 550px;
    padding: 16px;
    border: 1px solid red;
`;

const FlexContainer = Styled.span`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StyledCard = Styled.div`
    width: 200px;
    height: 400px;
    padding: 20px;
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

const StyledImages = Styled.img`
  max-width: 100%; // width of the image won’t exceed the width of its parent (200px) 
  min-height: 300px;
`;

// src: https://travishorn.com/some-ways-to-align-the-last-row-in-a-flexbox-grid-720f365dcb16
const StyledMockCard = Styled.span`
  width: 200px;
  padding: 37px; // 16px wrapper + 20px card + 1px border = 37px
  visibility: hidden;
`;

// https://www.smashingmagazine.com/2020/06/rest-api-react-fetch-axios/  first param: id of anime in myanimelist url path.
const Card: React.FunctionComponent<React.ReactNode> = () => {
  // apiData is defined as a ApiDataType[] (string, number) and initialized as a empty array([])
  const [apiData, setApiData] = useState<ApiDataType[]>([]);

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
  }, []);

  return (
    <FlexContainer>
      {apiData.map((item) => {
        return (
          <Wrapper key={item.mal_id}>
            <StyledCard>
              <StyledUnorderedList>
                <li>
                  <StyledImages
                    src={item.image_url}
                    alt={item.title}
                  ></StyledImages>
                  <h3>{item.title} </h3>
                  <p>description her</p>
                </li>
              </StyledUnorderedList>
            </StyledCard>
          </Wrapper>
        );
      })}
      <StyledMockCard>Last 1/2</StyledMockCard>
      <StyledMockCard>Last 2/2</StyledMockCard>
    </FlexContainer>
  );
};

export default Card;
