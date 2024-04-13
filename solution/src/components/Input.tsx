import React from "react";
import styled from "styled-components";

export default styled.input`
  width: 100%;
  padding: 6px 11px;
  font-size: 14px;
  line-height: 1.5715;
  color: rgba(0, 0, 0, 0.85);
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;
  box-sizing: border-box;

  &:hover {
    border-color: #40a9ff;
  }

  &:focus {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    outline: 0;
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.35);
  }

  &:disabled {
    background-color: #f5f5f5;
    border-color: #d9d9d9;
    cursor: not-allowed;
  }
`;
