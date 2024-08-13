import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { SearchOpenContext } from "../contexts/SearchOpenContext";

const Input = ({ handleChange, searchInput }) => {
  const { setIsSearchOpen } = useContext(SearchOpenContext);
  return (
    <div className="w-[100%] h-8 sm:h-8 sm:w-[460px] sm:ml-8 bg-gray-100 rounded-full flex items-center">
      <span className="h-8 w-10 sm:h-9 sm:w-12  rounded-full flex justify-center items-center">
        {<FaSearch className="text-primary text-sm" />}
      </span>
      <input
        placeholder="Search..."
        className="h-7 sm:h-8 sm:w-full bg-gray-100 rounded-full flex text-sm focus:outline-none placeholder-primary"
        value={searchInput}
        onChange={(e) => handleChange(e)}
        onClick={() => setIsSearchOpen(true)}
      />
    </div>
  );
};

export default Input;
