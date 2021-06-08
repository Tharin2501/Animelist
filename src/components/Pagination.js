import { useState } from "react";
import { Button } from "./TitleButtonGroup";

// TODO: refactor to .tsx file and add types
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  const [activeButton, setActiveButton] = useState(null);

  // Math object used to round up number
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleOnClick = (number) => {
    paginate(number);
    setActiveButton(number);
  };

  return (
    <div>
      {pageNumbers.map((number) => (
        <Button
          key={number}
          onClick={() => handleOnClick(number)}
          active={activeButton === number ? true : false}
        >
          {number}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
