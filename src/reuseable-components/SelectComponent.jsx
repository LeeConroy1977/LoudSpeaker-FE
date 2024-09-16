import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const SelectComponent = ({
  defaultOption,
  optionArray,
  handleChange,
  selectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue) => {
    handleChange({ target: { value: optionValue } });
    setIsOpen(false);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-[110px] sm:w-[130px] p-2 pl-3 pr-3 mr-4 rounded-xl text-[10px] font-bold text-primary bg-gray-100 dark:bg-secondaryBg dark:text-darkTextPrimary flex justify-between items-center"
      >
        {selectedOption
          ? optionArray.find((opt) => opt.sort === selectedOption)?.title ||
            defaultOption
          : defaultOption}
        <FaChevronDown className="ml-2" />
      </button>

      {isOpen && (
        <ul className="absolute left-0 top-[31px] w-[110px] sm:w-[130px] mt-1 rounded-lg bg-white dark:bg-secondaryBg shadow-lg z-10">
          {optionArray.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option.sort)}
              className="p-2 text-[10px] font-bold text-primary dark:text-darkTextPrimary hover:bg-primary hover:text-white dark:hover:text-white dark:hover:bg-primary cursor-pointer"
            >
              {option.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectComponent;
