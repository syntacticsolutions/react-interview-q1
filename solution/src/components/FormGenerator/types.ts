import { Option } from "../Dropdown/Dropdown";
import { FormInput } from "./FormInputs/FormInput";
import { FormSelect } from "./FormInputs/FormSelect";

export enum InputTypes {
  STRING = "STRING",
  SELECT = "SELECT",
}

export const inputMap = {
  [InputTypes.STRING]: FormInput,
  [InputTypes.SELECT]: FormSelect,
};

export interface FormGeneratorProps<T extends Record<string, any>> {
  inputTypeMap?: Record<InputTypes, React.FC>;
  config: FGConfig<any>[];
  onUpdated?: (formData: T) => void;
  initialState?: T;
}

export type FGConfig<T extends BaseConfig> = T extends InputConfig
  ? InputConfig
  : SelectConfig;

type BaseConfig = {
  path: string;
  label: string;
  placeholder: string;
  type: InputTypes;
};

interface InputConfig extends BaseConfig {}

interface SelectConfig extends BaseConfig {
  options: Option[];
}
