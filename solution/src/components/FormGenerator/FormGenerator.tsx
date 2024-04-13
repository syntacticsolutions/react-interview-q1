import React, { useEffect } from "react";
import { useFormData } from "../../hooks/useFormData";
import { FormGeneratorProps, inputMap } from "./types";
import { usePropGetter } from "./hooks/usePropGetter";
import _ from "lodash";

export const FormGenerator = ({
  config,
  inputTypeMap = inputMap,
  onUpdated = (data: Record<string, any>) => {},
  errors = {},
  formState,
}: FormGeneratorProps<any>) => {
  const { ...setters } = useFormData(formState, onUpdated);

  const getComponentSpecificProps = usePropGetter(formState, setters);

  return (
    <div>
      {config.map((config, key) => (
        <InputWrapper
          formState={formState}
          config={config}
          inputTypeMap={inputTypeMap}
          getComponentSpecificProps={getComponentSpecificProps}
          errors={errors}
          key={key}
        />
      ))}
    </div>
  );
};

const InputWrapper = ({
  config,
  inputTypeMap,
  getComponentSpecificProps,
  errors,
  key,
  formState
}: any) => {
  const Component = inputTypeMap[config.type];
  const props = getComponentSpecificProps(config);
  const error = _.get(errors, config.path);

  return (
    <div>
      <Component {...props} error={error} key={key} />
    </div>
  );
};
