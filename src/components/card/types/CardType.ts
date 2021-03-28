import React from "react";

type CardType = {
    media?: React.ReactNode, // image or video
    title: string,
    description: string
}

export interface ApiDataType  {
    mal_id: number;
    title: string;
  };

export default CardType;