import { css, styled } from "styled-components";
import { ButtonProps } from "./Button";

// Styling based on button type
const buttonTypeStyles = {
  primary: css`
    background: linear-gradient(0.25turn, #4169e1, #87ceeb);
    color: white;
  `,
  default: css`
    background: #f0f0f0;
    color: black;
  `,
  danger: css`
    background: #ff4d4f;
    color: white;
  `,
};

// Styling based on button size
const buttonSizeStyles = {
  small: css`
    padding: 4px 8px;
    font-size: 12px;
  `,
  large: css`
    padding: 12px 24px;
    font-size: 16px;
  `,
};

export const StyledButton = styled.button<ButtonProps>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  ${(props) => buttonTypeStyles[props.type || "default"]}
  ${(props) => buttonSizeStyles[props.size || "small"]}
`;
