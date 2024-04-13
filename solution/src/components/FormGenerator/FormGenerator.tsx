import React, { useEffect } from "react";
import { useFormData } from "../../hooks/useFormData";
import { FormGeneratorProps, inputMap } from "./types";
import { usePropGetter } from "./hooks/usePropGetter";

export const FormGenerator = ({
  config,
  initialState = {},
  inputTypeMap = inputMap,
  onUpdated,
}: FormGeneratorProps<any>) => {
  const { state, ...setters } = useFormData(initialState);
  // const errors = useValidation(state);

  const getComponentSpecificProps = usePropGetter(state, setters);

  useEffect(() => {
    onUpdated?.(state);
  }, [state, onUpdated]);

  return (
    <div>
      {config.map((config, key) => {
        const Component = inputTypeMap[config.type];
        const props = getComponentSpecificProps(config);

        return <Component {...props} key={key} />;
      })}
    </div>
  );
};
