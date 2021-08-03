import styled from "styled-components";
import Card from "./Card";
import { ApiDataType } from "./types/CardType";
import Search from "../search/Search";
import useSemiPersistentState from "../../hooks/useSemiPersustentState";
import TitleButtonGroup from "../TitleButtonGroup";
import NavigationBar from "../navigationbar/NavigationBar";
import { FiSearch } from "react-icons/fi";

// API:  https://jikan.docs.apiary.io/#reference
const ContentContainer = styled.span`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

/* src: https://travishorn.com/some-ways-to-align-the-last-row-in-a-flexbox-grid-720f365dcb16
const StyledMockCard = styled.span`
  width: 200px;
  padding: 37px; // 16px wrapper + 20px card + 1px border = 37px
  visibility: hidden;
`;
*/

const CardList: React.FunctionComponent<ApiDataType> = ({
  filteredData,
  allData,
}) => {
  // *** SEARCH ***
  // State needs to be "lifted up" to common parent(cardList) to share state with other components
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    "searchResult",
    ""
  );

  // Props are passed top-> bot, use Callback handler to communicate from CardList <-> Search
  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.currentTarget.value); // currentTarget = element that has the event listener(input).
  };

  const filterItems = (query: string) => {
    if (!query) {
      return filteredData;
    }

    return filteredData?.filter((post: ApiDataType) => {
      if (post.title?.toLowerCase().includes(query)) {
        return post;
      }
      return null;
    });
  };

  const filteredPosts = filterItems(searchTerm);

  const clearInput = () => {
    setSearchTerm([]);
  };

  // *** END OF SEARCH ***

  return (
    <>
      <NavigationBar />
      <Search
        id="searchbar"
        onSearch={handleOnSearch}
        onClickClear={clearInput}
        searchTerm={searchTerm}
        isFocused
        data={
          allData
        } /* OR  data={filteredData} it will display the paginated data */
      >
        <FiSearch size={20} />
      </Search>
      <TitleButtonGroup filteredData={allData} />
      <ContentContainer>
        {filteredPosts?.map((item: ApiDataType) => (
          <Card key={item.mal_id} item={item} />
        ))}
        {/*
        <StyledMockCard>Last 1/2</StyledMockCard>
        <StyledMockCard>Last 2/2</StyledMockCard>
        */}
      </ContentContainer>
    </>
  );
};

export default CardList;
