import { ChangeEvent, useCallback, useState } from "react";
import { Option } from "../components/Dropdown/types";

export function useFormData<T = Record<string, any>>(
  data: T,
  onChange: (data: T) => void
) {
  const setInput = useCallback(
    (path: string) => (ev: ChangeEvent<HTMLInputElement>) => {
      const newData = {
        ...data,
        [path]: ev.target.value,
      };
      onChange(newData);
    },
    [data]
  );

  const setSelect = useCallback(
    (path: string) => (opt: Option) => {
      const newData = {
        ...data,
        [path]: opt,
      };
      onChange(newData);
    },
    [data]
  );

  return { setInput, setSelect };
}
