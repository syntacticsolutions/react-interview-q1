import React, { useEffect, useState } from "react";
import { InputTypes } from "../../components/FormGenerator/types";
import { FormGenerator } from "../../components/FormGenerator/FormGenerator";
import { getLocations, isNameValid } from "../../mock-api/apis";
import { Option } from "../../components/Dropdown/types";
import _ from "lodash";
import { styled } from "styled-components";
import { useFormErrors, validate } from "../../hooks/useFormErrors/useFormErrors";

const config = [
  {
    path: "name",
    type: InputTypes.STRING,
    label: "Name",
    placeholder: "Name (required)",
  },
  {
    type: InputTypes.SELECT,
    label: "Location",
    placeholder: "Location (required)",
    path: "location",
    options: [] as Option[],
  },
];

export const custom = async ({ formData, value, error }: any) => {
    if (error) return { error };
    const isValid = await isNameValid(value);
    if (!isValid) return { error: "this name has already been taken." };
    return { formData, value };
  };


const testMap = {
    name: validate(custom),
  };

export const Users = () => {
  const [formState, setFormState] = useState({});
  const [reactiveConfig, setReactiveConfig] = useState(config);

  useEffect(() => {
    getLocations().then((locations: string[]) => {
      const newData = _.cloneDeep(reactiveConfig);
      newData[1].options = locations.map((location: string) => ({
        label: location,
        value: location,
      }));
      setReactiveConfig(newData);
    });
  }, []);

  const {errors} = useFormErrors(formState, testMap)

  return (
    <Main>
      <FormSection>
        <FormGenerator config={reactiveConfig} onUpdated={setFormState} errors={errors as any} />
        <div className="button-container">
        </div>
      </FormSection>
    </Main>
  );
};

const FormSection = styled.section`
  max-width: 700px;
  width: 100%;
  margin-top: 100px;

  .input-container {
    margin-bottom: 20px;
  }
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
`;
