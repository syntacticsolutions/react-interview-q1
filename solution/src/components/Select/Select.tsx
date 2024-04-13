import React, { ChangeEvent, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Input from "../Input";
import { Option } from "../Dropdown/types";

interface SelectProps {
  onChange: (value: Option) => void;
  options: Option[];
  value: string;
  placeholder?: string;
}

export const Select = ({ onChange, options = [], value, placeholder }: SelectProps) => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelected = (item: Option) => {
    setVisible(false);
    if (onChange) {
      onChange(item);
    }
    setSearch("");
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="relate-select">
      <Input
        type="text"
        placeholder={placeholder}
        onChange={handleSearchChange}
        onInput={handleSearchChange}
        onKeyUp={handleSearchChange as any}
        onClick={(ev) => {
          ev.stopPropagation();
        }}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        value={value}
      />
      {visible}
      <Dropdown
        visible={visible}
        list={filteredOptions}
        onSelected={handleSelected}
        onClosed={() => setVisible(false)}
      />
    </div>
  );
};
