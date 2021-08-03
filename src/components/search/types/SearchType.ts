import { ApiDataType } from "../../card/types/CardType";

type SearchType = {
   searchTerm: string; 
   onSearch (event: React.ChangeEvent<HTMLInputElement>): void;
   onClickClear: () => void;
   id: string;
   type?: string;
   isFocused?: boolean;
   data: ApiDataType[] | undefined; // this is the filteredData passed from CardList
};

export default SearchType;