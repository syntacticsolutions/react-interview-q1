import styled from "styled-components";

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse; /* Ensures borders between cells are merged */
  background-color: #fff;
`;

export const StyledHead = styled.thead`
  background-color: #fafafa;
`;

export const StyledHeaderCell = styled.th`
  padding: 16px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  text-align: left;
`;

export const StyledRow = styled.tr`
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const StyledCell = styled.td`
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
`;
