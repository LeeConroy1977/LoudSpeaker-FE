import React from "react";
import { FaSearch } from "react-icons/fa";
const Input = () => {
  return (
    <div
      style={{ width: "460px" }}
      className="h-7 sm:h-8 sm:ml-8 bg-gray-100 rounded-full flex items-center"
    >
      <span className="h-7 sm:h-9 sm:w-12  rounded-full flex justify-center items-center">
        {<FaSearch className="text-primary text-sm" />}
      </span>
      <input
        placeholder="Search..."
        className="h-7 sm:h-8 sm:w-full bg-gray-100 rounded-full flex text-sm focus:outline-none placeholder-primary"
      />
    </div>
  );
};

export default Input;
