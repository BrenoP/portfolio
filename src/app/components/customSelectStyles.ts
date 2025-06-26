import { StylesConfig, GroupBase } from "react-select";
import { LangOption } from "./ClientOnlySelect";

const customSelectStyles: StylesConfig<LangOption, false, GroupBase<LangOption>> = {
  control: (provided) => ({
    ...provided,
    borderRadius: 9999,
    minWidth: 80,
    borderColor: "#d1d5db",
    boxShadow: "none",
    cursor: "pointer",
    padding: "2px 4px",
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    backgroundColor: state.isSelected ? "#1C398E" : state.isFocused ? "#F9FAFB" : "#fff",
    color: state.isSelected ? "#fff" : "#1C398E",
    borderRadius: 8,
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: 12,
    overflow: "hidden",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#1C398E",
    fontWeight: 700,
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#1C398E",
    padding: 4,
  }),
  indicatorSeparator: () => ({ display: "none" }),
};

export default customSelectStyles; 