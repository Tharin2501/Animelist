import { useEffect, useRef } from "react";
import styled from "styled-components";
import SearchType from "./types/SearchType";

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  width: 100%;
`;

const StyledInput = styled.input`
  font-size: 15px;
  outline: none;
  border: none;
  padding: 7px;
  background: aliceblue;
`;

const SearchIcon = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  background-color: aliceblue;
`;

// good source unused for now src: https://www.emgoto.com/react-search-bar/
const Search: React.FunctionComponent<SearchType> = ({
  searchTerm,
  onSearch,
  id,
  type = "text",
  children,
  isFocused,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // with the initial value of a ref being null, inputRef might be null. TypeScript complains that you should do a strict null check.
    if (isFocused && inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <form action="/" method="get" autoComplete="off">
      <SearchContainer>
        <SearchIcon>{children}</SearchIcon>
        <StyledInput
          value={searchTerm} // Controlled Component
          onChange={onSearch}
          type={type}
          id={id}
          placeholder="Search..."
          name="search"
          ref={inputRef}
        />
      </SearchContainer>
    </form>
  );
};

export default Search;
