import { useEffect, useState } from "react";
import styled from "styled-components";
import DefaultButton from "../button/DefaultButton";
import PaginationType from "./types/PaginationType";

const StyledDefaultButton = styled(DefaultButton)`
  margin: 3px;
  padding: 2px 4px;
  border: 1px solid lightgrey;
  border-radius: 3px;
  color: ${({ theme }) => theme.color.slateBlue};
  &:hover {
    border: 1px solid ${({ theme }) => theme.color.slateBlue};
    cursor: pointer;
  }
  background-color: ${({ active }) => (active ? "slateBlue" : null)};
  color: ${({ active }) => (active ? "white" : null)};
`;

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
        <StyledDefaultButton onClick={() => handleOnPrevClick(--currentPage)}>
          Previous
        </StyledDefaultButton>
      ) : null}
      {pageNumbers.map((pageNumber) => (
        <StyledDefaultButton
          key={pageNumber}
          onClick={() => handleOnClick(pageNumber)}
          active={activeButton === pageNumber ? true : false}
        >
          {pageNumber}
        </StyledDefaultButton>
      ))}
      {activeButton === pageNumbers.length ? null : (
        <StyledDefaultButton onClick={() => handleOnNextClick(++currentPage)}>
          Next
        </StyledDefaultButton>
      )}
    </>
  );
};

export default Pagination;
