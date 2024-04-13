import React from "react";
import {
  StyledCell,
  StyledHead,
  StyledHeaderCell,
  StyledRow,
  StyledTable,
} from "./Styles";

type Column = {
  label: string;
  key: string;
};

type TableProps<T extends Record<string, any>> = {
  data: T[];
  config: Column[];
};

export const Table = ({ config, data }: TableProps<any>) => {
  return (
    <StyledTable>
      <StyledHead>
        <tr>
          {config.map((column: Column) => (
            <StyledHeaderCell key={column.key}>{column.label}</StyledHeaderCell>
          ))}
        </tr>
      </StyledHead>
      <tbody>
        {data.map((row, rowIndex) => (
          <StyledRow key={rowIndex}>
            {config.map((column: Column) => (
              <StyledCell key={column.key}>{row[column.key]}</StyledCell>
            ))}
          </StyledRow>
        ))}
      </tbody>
    </StyledTable>
  );
};
