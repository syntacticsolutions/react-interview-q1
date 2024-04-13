import React from "react";
import { StyledButton } from "./Styles";

export type ButtonProps = {
  type?: "primary" | "default" | "danger";
  size?: "small" | "large";
  onClick?: () => void;
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  type = "default",
  size = "small",
  onClick,
  children,
}) => {
  return (
    <StyledButton type={type} size={size} onClick={onClick}>
      {children}
    </StyledButton>
  );
};
