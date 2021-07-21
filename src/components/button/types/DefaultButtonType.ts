import { ReactNode } from "react";

type DefaultButtonFunctionType = {
    icon?: ReactNode;
    onClick: () => void;
    children: ReactNode; // add children here to make it required
};
  
export type DefaultButtonStyleType = {
    rounded?: boolean;
    bgColor?: string;
    bgColorHover?: string;
    hover?: boolean;
    bordered?: boolean;
};
  
export type DefaultButtonType = DefaultButtonFunctionType & DefaultButtonStyleType;