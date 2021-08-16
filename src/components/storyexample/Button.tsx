import { FunctionComponent, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  backgroundColor?: string;
};

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  backgroundColor,
}: ButtonProps) => (
  <button style={{ backgroundColor }} onClick={onClick}>
    {children}
  </button>
);
