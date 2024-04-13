import React, { useEffect } from "react";
import { useFormData } from "../../hooks/useFormData";
import { FormGeneratorProps, inputMap } from "./types";
import { usePropGetter } from "./hooks/usePropGetter";
import _ from 'lodash'

export const FormGenerator = ({
  config,
  inputTypeMap = inputMap,
  onUpdated = (data: Record<string, any>) => {},
  errors = {},
  formState
}: FormGeneratorProps<any>) => {
  const { state, ...setters } = useFormData(formState, onUpdated);

  const getComponentSpecificProps = usePropGetter(formState, setters);

  return (
    <div>
      {config.map((config, key) => {
        const Component = inputTypeMap[config.type];
        const props = getComponentSpecificProps(config);
        const error = _.get(errors, config.path);

        return (
          <div>
            <Component {...props} error={error} key={key} />
          </div>
        );
      })}
    </div>
  );
};
