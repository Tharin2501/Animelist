import React, { useEffect, useState } from "react";
import Pagination from "../Pagination";
import TitleButtonGroup from "../TitleButtonGroup";
import CardList from "./CardList";

import { ApiDataType } from "./types/CardType";

const CardContainer: React.FunctionComponent<React.ReactNode> = () => {
  // apiData is defined as a ApiDataType[] and initialized as a empty array([])
  const [apiData, setApiData] = useState<ApiDataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

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
  console.log(apiData);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = apiData.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <TitleButtonGroup data={apiData} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={apiData.length}
        paginate={paginate}
      />
      <CardList data={currentPosts} />
    </>
  );
};

export default CardContainer;
