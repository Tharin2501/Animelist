
type SearchType = {
   searchTerm: string; 
   // setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
   onSearch (event: React.ChangeEvent<HTMLInputElement>): void;
};

export default SearchType;