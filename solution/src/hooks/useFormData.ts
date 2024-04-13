import { ChangeEvent, useCallback, useState } from "react";

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

  const setSelect = useCallback((path: string) => () => {

  }, []);

  return { state, setState, setInput, setSelect };
}
