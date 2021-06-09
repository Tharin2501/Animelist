import { useEffect, useState } from "react";
import { Button } from "../button/Button";
import PaginationType from "./types/PaginationType";

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}: PaginationType) => {
  const pageNumbers: number[] = [];
  // if we dont pass in types, TS assumes this state is (and always will be) null and will throw error
  const [activeButton, setActiveButton] = useState<number | null>(null);

  // We always start at first page, so first button is activated once at first render
  useEffect(() => {
    if (currentPage === 1) {
      return setActiveButton(1);
    }
  }, [currentPage]);

  // Math object used to round up number
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleOnClick = (pageNumber: number) => {
    paginate(pageNumber);
    setActiveButton(pageNumber);
  };

  const handleOnNextClick = (next: number) => {
    paginate(next);
    setActiveButton(next);
  };

  const handleOnPrevClick = (prev: number) => {
    paginate(prev);
    setActiveButton(prev);
  };

  return (
    <>
      {activeButton! > 1 ? (
        <Button onClick={() => handleOnPrevClick(--currentPage)}>
          Previous
        </Button>
      ) : null}
      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          onClick={() => handleOnClick(pageNumber)}
          active={activeButton === pageNumber ? true : false}
        >
          {pageNumber}
        </Button>
      ))}
      {activeButton === pageNumbers.length ? null : (
        <Button onClick={() => handleOnNextClick(++currentPage)}>Next</Button>
      )}
    </>
  );
};

export default Pagination;
