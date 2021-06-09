import { useState } from "react";
import { Button } from "../button/Button";
import PaginationType from "./types/PaginationType";

const Pagination = ({ postsPerPage, totalPosts, paginate }: PaginationType) => {
  const pageNumbers = [];
  // if we dont pass in types, TS assumes this state is (and always will be) null and will throw error
  const [activeButton, setActiveButton] = useState<number | null>(null);

  // Math object used to round up number
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleOnClick = (pageNumber: number) => {
    paginate(pageNumber);
    setActiveButton(pageNumber);
  };

  return (
    <div>
      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          onClick={() => handleOnClick(pageNumber)}
          active={activeButton === pageNumber ? true : false}
        >
          {pageNumber}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
