import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa"; // Optional: Chevron icon for the dropdown

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
    <div className={`relative sm:mr-4 w-[120px]  `} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-[110px] sm:w-full p-2 pl-3 pr-3 rounded-xl text-[10px] sm:text-[11px] font-bold text-primary bg-gray-200 flex justify-between items-center"
      >
        {selectedOption
          ? optionArray.find((opt) => opt.sort === selectedOption).title
          : defaultOption}
        <FaChevronDown className="ml-2" />
      </button>

      {isOpen && (
        <ul className="absolute left-0 top-[31px] w-full mt-1 rounded-lg bg-white shadow-lg z-10">
          <li
            onClick={() => handleSelect("")}
            className="p-2 text-[10px] sm:text-[11px] font-bold text-primary hover:bg-primary hover:text-white cursor-pointer"
          >
            {defaultOption}
          </li>
          {optionArray &&
            optionArray.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option.sort)}
                className="p-2 text-[10px] sm:text-[11px] font-bold text-primary hover:bg-primary hover:text-white cursor-pointer"
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
