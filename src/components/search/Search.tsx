import { useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import styled from "styled-components";
import SearchType from "./types/SearchType";

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 16px;
`;

//src: https://www.emgoto.com/react-search-bar/
const Search = ({ searchQuery, setSearchQuery }: SearchType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // with the initial value of a ref being null, inputRef might be null. TypeScript complains that you should do a strict null check.
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
    return setSearchQuery(event.currentTarget.value); // currentTarget = element that has the event listener(input).
  };

  return (
    <form action="/" method="get" autoComplete="off">
      <SearchContainer>
        <label htmlFor="searchbar" style={{ paddingRight: "6px" }}>
          <FiSearch size={20} />
        </label>
        <input
          value={searchQuery}
          onInput={handleOnChange}
          type="text"
          id="searchbar"
          placeholder="Search..."
          name="search"
          ref={inputRef}
        />
        <button type="submit">Search</button>
      </SearchContainer>
    </form>
  );
};

export default Search;