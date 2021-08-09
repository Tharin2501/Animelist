import { ReactNode } from "react";

type DefaultButtonFunctionType = {
    icon?: ReactNode;
    onClick: () => void;
    children: ReactNode; // add children here to make it required
    className?: string;
};
  
export type DefaultButtonStyleType = {
    active?: boolean; // TitleButtonGroup
    rounded?: boolean;
    hover?: boolean;
    bordered?: boolean;
};
  
export type DefaultButtonType = DefaultButtonFunctionType & DefaultButtonStyleType;