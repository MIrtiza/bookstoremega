import React from "react";
import Select, { SingleValue, MultiValue, ActionMeta } from "react-select";
import { OptionType } from "../types/filtersTypes";

interface CustomSelectProps {
  options: OptionType[];
  value: OptionType | null;
  onChange: (
    newValue: SingleValue<OptionType> | MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => void;
  placeholder?: string;
  isMulti?: boolean;
}

const SelectDropdown: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  isMulti = false,
}) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      isMulti={isMulti}
    />
  );
};

export default SelectDropdown;
