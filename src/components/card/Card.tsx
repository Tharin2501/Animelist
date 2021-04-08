import React from "react";
import Styled from "styled-components";
import { CardType } from "./types/CardType";

// TODO: image container. comment out title and despcrition and make api image fixed hieght. trenger conmtainer for alt egentlig så start med det
const Wrapper = Styled.div`
    max-width: 250px;
    max-height: 550px;
    padding: 16px;
    border: 1px solid red;
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

const Card: React.FunctionComponent<CardType> = ({ item }) => {
  return (
    <Wrapper key={item.mal_id}>
      <StyledCard>
        <StyledUnorderedList>
          <li>
            <StyledImages src={item.image_url} alt={item.title}></StyledImages>
            <h3>{item.title} </h3>
            <p>description her</p>
          </li>
        </StyledUnorderedList>
      </StyledCard>
    </Wrapper>
  );
};

export default Card;
