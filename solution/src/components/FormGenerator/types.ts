import { Option } from "../Dropdown/types";
import Input from "../Input";
import { Select } from "../Select/Select";

export enum InputTypes {
  STRING = "STRING",
  SELECT = "SELECT",
}

export const inputMap = {
  [InputTypes.STRING]: Input,
  [InputTypes.SELECT]: Select,
};

export interface FormGeneratorProps<T extends Record<string, any>> {
  inputTypeMap?: Record<InputTypes, React.FC<any>>;
  config: FGConfig<any>[];
  onUpdated?: (formData: T) => void;
  initialState?: T;
  errors?: Record<string, boolean>
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
