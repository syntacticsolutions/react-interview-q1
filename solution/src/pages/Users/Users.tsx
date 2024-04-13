import React, { useCallback, useEffect, useState } from "react";
import { InputTypes } from "../../components/FormGenerator/types";
import { FormGenerator } from "../../components/FormGenerator/FormGenerator";
import { getLocations, isNameValid } from "../../mock-api/apis";
import { Option } from "../../components/Dropdown/types";
import _ from "lodash";
import { styled } from "styled-components";
import {
  useFormErrors,
  validate,
} from "../../hooks/useFormErrors/useFormErrors";
import { usersConfig } from "./tableConfig";
import { Button } from "../../Button/Button";
import { Table } from "../../components/Table/Table";

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

type User = {
  name: string;
  location: string;
};

type FormUser = {
  name: string;
  location: { value: string };
};

export const Users = () => {
  const [formState, setFormState] = useState({} as FormUser);
  const [reactiveConfig, setReactiveConfig] = useState(config);
  const [tableData, setTableData] = useState([] as User[]);

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

  const { errors } = useFormErrors(formState, testMap);

  const addUser = useCallback(() => {
    if (_.isEmpty(errors)) {
      const user = {
        name: formState.name,
        location: formState.location.value,
      };
      setTableData((old) => [...old, user]);
    }
  }, [formState]);

  return (
    <Main>
      <FormSection>
        <h1>User location Form</h1>
        <FormGenerator
          config={reactiveConfig}
          formState={formState}
          onUpdated={setFormState}
          errors={errors as any}
        />
        <div className="button-container">
          <Button
            type="default"
            size="large"
            onClick={() => setFormState({} as FormUser)}
          >
            Clear
          </Button>
          <Button onClick={addUser} type="primary" size="large">
            Add
          </Button>
        </div>
        {tableData.length && <Table data={tableData} config={usersConfig} />}
      </FormSection>
    </Main>
  );
};

const FormSection = styled.section`
  max-width: 700px;
  width: 100%;
  margin-top: 100px;

  h1 {
    text-align: left;
  }

  .input-container {
    margin-bottom: 20px;
  }

  .button-container {
    text-align: right;

    button {
      margin-left: 20px;
    }
  }
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
`;
