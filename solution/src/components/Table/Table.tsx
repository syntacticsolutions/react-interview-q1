import React from "react";

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
    <table>
      <thead>
        <tr>
          {config.map((column: Column) => (
            <th>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr>
            {config.map((column: Column) => (
              <th>{row[column.key]}</th>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
