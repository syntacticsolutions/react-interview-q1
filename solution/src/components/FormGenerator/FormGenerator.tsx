import React, { useCallback, useEffect } from "react";
import { useFormData } from "../../hooks/useFormData";
import { FGConfig, FormGeneratorProps, InputTypes, inputMap } from "./types";

export const FormGenerator = ({
  config,
  initialState = {},
  inputTypeMap = inputMap,
  onUpdated,
}: FormGeneratorProps<any>) => {
  const { state, setInput, setSelect } = useFormData(initialState);
  // const errors = useValidation(state);

  const getComponentSpecificProps = useCallback(
    (config: FGConfig<any>): Record<string, any> => {
      switch (config.type) {
        case InputTypes.STRING:
          return {
            onChange: setInput(config.path),
            value: state[config.path],
          };
        case InputTypes.SELECT:
            return {
                onChange: setSelect(config.path)
            }
      }
    },
    [state]
  );

  useEffect(() => {
    onUpdated?.(state);
  }, [state]);

  return (
    <div>
      {config.map((config) => {
        const Component = inputTypeMap[config.type];
        const props = getComponentSpecificProps(config);

        return <Component {...props} />;
      })}
    </div>
  );
};
