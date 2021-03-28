import React, { useState } from "react";
import Card from "./Card";
import Styled from "styled-components";

// https://dev.to/britneys/creating-reusable-react-components-with-map-4823

const characters = [
  {
    id: 1,
    name: "Wonder Woman",
    alterEgo: "Diana Prince",
    alignment: "hero",
  },
  {
    id: 2,
    name: "Poison Ivy",
    alterEgo: "Pamela Lillian Isley",
    alignment: "villain",
  },
  {
    id: 3,
    name: "Black Canary",
    alterEgo: "Dinah Drake",
    alignment: "hero",
  },
  {
    id: 4,
    name: "Catwoman",
    alterEgo: "Selina Kyle",
    alignment: "villain",
  },
];

const CardListItem = (props: any) => {
  return (
    <li>
      <div
        className="card-container"
        style={{
          width: "50%",
          border: "solid 3px #d3d3d3",
          margin: "10px auto",
        }}
      >
        <p>
          <strong>{props.character.name}</strong>
        </p>
        <p>{props.character.alterEgo}</p>
        <p>{props.character.alignment}</p>
      </div>
    </li>
  );
};

const CardList = () => {
  return (
    <ul style={{ listStyleType: "none" }}>
      {characters.map((character) => {
        return <CardListItem character={character} key={character.id} />;
      })}
    </ul>
  );
};
const CardsList: React.FunctionComponent<React.ReactNode> = ({}) => {
  return (
    <ul>
      <li>
        {/* <Card title="title" description="some description about this card" /> */}
        <CardList />
      </li>
    </ul>
  );
};

export default CardsList;
