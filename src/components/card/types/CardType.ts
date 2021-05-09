
// type for Card, item returned by map function is the same type as the api data.
export type CardType = {
  item: ApiDataType
}

// type for CardList, Api data returned by Jikan API initialized as an empty array
export interface ApiDataType  {
    mal_id?: number;
    title?: string;
    image_url?: string;
    data: ApiDataType[];
  };


