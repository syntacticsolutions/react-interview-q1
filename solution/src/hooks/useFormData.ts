import { ChangeEvent, useCallback, useState } from "react";
import { Option } from "../components/Dropdown/types";

export function useFormData<T = Record<string, any>>(
  initialState: T,
  onChange: (data: T) => void
) {
  const [state, setState] = useState(initialState);

  const setInput = useCallback(
    (path: string) => (ev: ChangeEvent<HTMLInputElement>) => {
      setState((oldState) => {
        const newData = {
          ...oldState,
          [path]: ev.target.value,
        };
        onChange(newData);
        return newData;
      });
    },
    []
  );

  const setSelect = useCallback(
    (path: string) => (opt: Option) => {
      setState((oldState) => {
        const newData = {
          ...oldState,
          [path]: opt,
        };
        onChange(newData);
        return newData;
      });
    },
    []
  );

  return { state, setState, setInput, setSelect };
}
