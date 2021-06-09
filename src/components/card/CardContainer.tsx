import React, { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import TitleButtonGroup from "../TitleButtonGroup";
import CardList from "./CardList";

import { ApiDataType } from "./types/CardType";

const CardContainer: React.FunctionComponent<React.ReactNode> = () => {
  // apiData is defined as a ApiDataType[] and initialized as a empty array([])
  const [apiData, setApiData] = useState<ApiDataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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

  // Start and end item indexes. Last -> currentPage(1) * itemsPerPage(10) = 10. First -> Last - itemsPerPage(10) = 0
  const last = currentPage * itemsPerPage; // 10
  const first = last - itemsPerPage; // 0

  // Get current items by selecting the first and stops at the last
  const currentPosts = apiData.slice(first, last);

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <TitleButtonGroup data={apiData} />
      <Pagination
        postsPerPage={itemsPerPage}
        totalPosts={apiData.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      <CardList data={currentPosts} />
    </>
  );
};

export default CardContainer;
