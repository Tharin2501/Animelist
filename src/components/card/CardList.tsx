import styled from "styled-components";
import Card from "./Card";
import { ApiDataType } from "./types/CardType";
import Search from "../search/Search";
import useSemiPersistentState from "../../hooks/useSemiPersustentState";

// API:  https://jikan.docs.apiary.io/#reference
const ContentContainer = styled.span`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

// src: https://travishorn.com/some-ways-to-align-the-last-row-in-a-flexbox-grid-720f365dcb16
const StyledMockCard = styled.span`
  width: 200px;
  padding: 37px; // 16px wrapper + 20px card + 1px border = 37px
  visibility: hidden;
`;

const CardList: React.FunctionComponent<ApiDataType> = ({ data }) => {
  /* Currently unused
  const { search } = window.location;
  const query = new URLSearchParams(search).get("");  
  */

  // State needs to be "lifted up" to common parent(cardList) to share state with other components
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    "searchResult",
    ""
  );

  /*
   Currently unused, might find a use case for this function later
   src: https://stackoverflow.com/questions/19590865/from-an-array-of-objects-extract-value-of-a-property-as-array
  
  function GetMalId(input: any, field: any) {
    let output: any[] = [];
    for (var i = 0; i < input.length; ++i) output.push(input[i][field]);
    return output;
  }
  */

  // Props are passed top-> bot, use Callback handler to communicate from CardList <- Search
  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.currentTarget.value); // currentTarget = element that has the event listener(input).
  };

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

  return (
    <>
      <Search onSearch={handleOnSearch} searchTerm={searchTerm} />
      <ContentContainer>
        {filteredPosts?.map((item: ApiDataType) => (
          <Card key={item.mal_id} item={item} />
        ))}
        <StyledMockCard>Last 1/2</StyledMockCard>
        <StyledMockCard>Last 2/2</StyledMockCard>
      </ContentContainer>
    </>
  );
};

export default CardList;
