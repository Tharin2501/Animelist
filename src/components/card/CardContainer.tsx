import React, { useEffect, useState } from "react";
import CardList from "./CardList";

import { ApiDataType } from "./types/CardType";

const CardContainer: React.FunctionComponent<React.ReactNode> = () => {
  // apiData is defined as a ApiDataType[] and initialized as a empty array([])
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
      setApiData(data.top);
    };
    fetchData();
  }, []);

  return <CardList data={apiData} />;
};

export default CardContainer;
