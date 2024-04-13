import { ChangeEvent, useCallback, useState } from "react";
import { Option } from "../components/Dropdown/types";

export function useFormData<T = Record<string, any>>(initialState: T) {
  const [state, setState] = useState(initialState);

  const setInput = useCallback(
    (path: string) => (ev: ChangeEvent<HTMLInputElement>) => {
      setState((oldState) => ({
        ...oldState,
        [path]: ev.target.value,
      }));
    },
    []
  );

  const setSelect = useCallback(
    (path: string) => (opt: Option) => {
      setState((oldState) => ({
        ...oldState,
        [path]: opt,
      }));
    },
    []
  );

  return { state, setState, setInput, setSelect };
}
