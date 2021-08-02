
type SearchType = {
   searchTerm: string; 
   onSearch (event: React.ChangeEvent<HTMLInputElement>): void;
   id: string;
   type?: string;
   isFocused?: boolean;
};

export default SearchType;