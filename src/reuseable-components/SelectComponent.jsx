import React from "react";

const SelectComponent = ({ selectStyle }) => {
  return (
    <select className={`${selectStyle} rounded-xl`}>
      <option value="">Published</option>
    </select>
  );
};

export default SelectComponent;
