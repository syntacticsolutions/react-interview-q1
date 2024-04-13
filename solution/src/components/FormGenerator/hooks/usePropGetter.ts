import { useCallback } from "react";
import { FGConfig, InputTypes } from "../types";

export const usePropGetter = (
  state: Record<string, any>,
  { setInput, setSelect }: any
) => {
  const getComponentSpecificProps = useCallback(
    (config: FGConfig<any>): Record<string, any> => {
      switch (config.type) {
        case InputTypes.STRING:
          return {
            onChange: setInput(config.path),
            value: state[config.path],
            ...config
          };
        case InputTypes.SELECT:
          return {
            onChange: setSelect(config.path),
            value: state[config.path],
            ...config
          };
      }
    },
    [state, setSelect, setInput]
  );

  return getComponentSpecificProps;
};
