import { Close } from "@styled-icons/evaicons-solid/Close";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { ApiDataType } from "../card/types/CardType";
import SearchType from "./types/SearchType";

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const StyledInput = styled.input`
  border: 4px solid red;
  font-size: 15px;
  min-width: 300px;
  outline: none;
  border: none;
  padding: 7px;
  background-color: ${({ theme }) => theme.color.aliceBlue};
  color: ${({ theme }) => theme.color.slateBlue};
  &::placeholder {
    color: ${({ theme }) => theme.color.slateBlue};
  }
  @media (max-width: 768px) {
    min-width: 200px;
  }
`;

const SearchIcon = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  background-color: ${({ theme }) => theme.color.aliceBlue};
  color: ${({ theme }) => theme.color.slateBlue};
`;

// dataResult
const DataContainer = styled.ul`
  // margin-top: 3px;
  width: 346px; // må være like lang som width på inputfiled
  height: 200px; // 300 for å få med alt mindre enn det og man må scrolle
  background-color: ${({ theme }) => theme.color.aliceBlue};
  color: ${({ theme }) => theme.color.slateBlue};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
  overflow: hidden;
  overflow-y: auto;
  margin: auto; // center
  padding: 0; // remove default padding of ul
  &::-webkit-scrollbar {
    //display: none;
  }
  @media (max-width: 768px) {
    width: 246px;
  }
`;

const DataItemLink = styled.a`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.color.slateBlue};
  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
`;

const StyledListItem = styled.li`
  margin-left: 10px;
  color: ${({ theme }) => theme.color.slateBlue};
`;

const StyledCloseBtn = styled(Close)`
  cursor: pointer;
  color: ${({ theme }) => theme.color.slateBlue};
`;

// good source unused for now src: https://www.emgoto.com/react-search-bar/
const Search: React.FunctionComponent<SearchType> = ({
  searchTerm,
  onSearch,
  onClickClear,
  id,
  type = "text",
  children,
  isFocused,
  data,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // with the initial value of a ref being null, inputRef might be null. TypeScript complains that you should do a strict null check.
    if (isFocused && inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  // TODO: EXTRACT TO OWN FILE TO USE IN CARDLIST AND HERE
  const filterItems = (query: string) => {
    if (!query) {
      return data;
    }

    return data?.filter((post: ApiDataType) => {
      if (post.title?.toLowerCase().includes(query)) {
        return post;
      }
      return null;
    });
  };

  const filteredPosts = filterItems(searchTerm);
  // END OF TODO

  return (
    <form action="/" method="get" autoComplete="off">
      <SearchContainer>
        <SearchIcon>
          {searchTerm.length === 0 ? (
            <>{children}</>
          ) : (
            <StyledCloseBtn size={20} onClick={onClickClear} />
          )}
        </SearchIcon>
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
      {searchTerm.length !== 0 && (
        <DataContainer>
          {filteredPosts!.slice(0, 15).map((item: ApiDataType) => {
            return (
              <DataItemLink href={item.url} key={item.mal_id}>
                <StyledListItem>{item.title}</StyledListItem>
              </DataItemLink>
            );
          })}
        </DataContainer>
      )}
    </form>
  );
};

export default Search;
