import { ReactNode } from "react";

export type ModalFunctionType = {
    title: string;
    onClickPost: () => void; /** function that doesn't take or return anything (VERY COMMON) */
    onClickClose: () => void   /** function with named prop (VERY COMMON) */
    icon?: ReactNode
}

export type ModalStyleType = {
    modalColor?: string;
    openPos?: string;
  };

  // Intersection type
export type ModalType = ModalFunctionType & ModalStyleType;