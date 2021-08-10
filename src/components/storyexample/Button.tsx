import React, { FC, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
};

export const Button: FC<ButtonProps> = ({ children, onClick }: ButtonProps) => (
  <button onClick={onClick} type="button">
    {children}
  </button>
);
