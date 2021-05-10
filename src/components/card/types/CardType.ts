
// type for Card, item returned by map function is the same type as the api data.
export type CardType = {
  item: ApiDataType
}

export interface ApiDataType  {
    mal_id: number;
    title: string;
    image_url: string;
  };

