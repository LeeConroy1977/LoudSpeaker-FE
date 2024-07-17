import React, { useState } from "react";

const SelectComponent = ({
  selectStyle,
  defaultOption,
  optionArray,
  handleChange,
  selectedOption,
}) => {
  return (
    <select
      value={selectedOption}
      onChange={handleChange}
      className={`${selectStyle} rounded-xl`}
    >
      <option value="">{defaultOption}</option>
      {optionArray &&
        optionArray.map((option, index) => {
          return (
            <option key={index} value={option.sort}>
              {option.title}
            </option>
          );
        })}
    </select>
  );
};

export default SelectComponent;
