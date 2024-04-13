import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
  max-height: 300px;
  height: 100%;
  overflow: visible;
  width: 100%;

  ul {
    overflow: hidden;
    width: 100%;
    display: none;
    list-style-type: none;
    position: absolute;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
    height: fit-content;
    background-color: white;
    border-radius: 8px;
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);

    &.visible {
      display: block;
    }

    div:focus {
      li {
        background: linear-gradient(0.25turn, #4169e1, #87ceeb);
        color: white;
      }
    }

    li {
      display: flex;
      gap: 15px;
      padding: 8px 16px;
      cursor: pointer;
      &:hover,
      &:focus {
        background: linear-gradient(0.25turn, #4169e1, #87ceeb);
        color: white;
      }
    }
  }
`;
