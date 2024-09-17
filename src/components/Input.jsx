import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import { useModal } from "../contexts/ModalContext";

const Input = ({ handleChange, searchInput }) => {
  const { setIsSearchOpen } = useContext(SearchOpenContext);
  const { isModalOpen } = useModal();
  return (
    <div className="w-[100%] h-8 sm:h-8 sm:w-[460px] sm:ml-8 bg-gray-100 dark:bg-secondaryBg rounded-full flex items-center relative z-40 ">
      <span className="h-8 w-10 sm:h-9 sm:w-12  rounded-full flex justify-center items-center">
        {<FaSearch className="text-primary dark:text-gray-300 text-sm z-50" />}
      </span>
      <input
        placeholder="Search..."
        className="h-7 sm:h-8 sm:w-full bg-gray-100 dark:bg-gray-800  rounded-full flex text-sm dark:text-gray-300 focus:outline-none placeholder-primary dark:placeholder:text-gray-300 z-50 "
        value={searchInput}
        onChange={(e) => handleChange(e)}
        onClick={() => setIsSearchOpen(true)}
        disabled={isModalOpen}
      />
    </div>
  );
};

export default Input;
