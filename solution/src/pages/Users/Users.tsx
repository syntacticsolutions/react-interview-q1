import React, { useState } from "react";
import { InputTypes } from "../../components/FormGenerator/types";
import { FormGenerator } from "../../components/FormGenerator/FormGenerator";

const config = [
  {
    path: "name",
    type: InputTypes.STRING,
    label: "Name",
    placeholder: "Required",
  },
  {
    type: InputTypes.SELECT,
    label: "Location",
    placeholder: "Required",
    path: "location",
    options: [],
  },
];

export const Users = () => {
  const [formState, setFormState] = useState({});

  return (
    <main>
      <section>
        <FormGenerator config={config} onUpdated={setFormState} />
      </section>
    </main>
  );
};
