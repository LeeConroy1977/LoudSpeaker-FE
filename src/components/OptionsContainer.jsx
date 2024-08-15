import React, { useContext, useState } from "react";
import SelectComponent from "../reuseable-components/SelectComponent";
import { IoIosOptions } from "react-icons/io";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { useModal } from "../contexts/ModalContext";
import TopicAccordion from "./TopicAccordion";
import sortByArr from "../../data/sortByOptions";
import orderByArr from "../../data/orderByOptions";
import { SearchParamsContext } from "../contexts/searchParamsContext";
import { SearchOpenContext } from "../contexts/SearchOpenContext";

const OptionsContainer = () => {
  const { width } = useContext(ScreenSizeContext);
  const { showModal } = useModal();
  const [selectedOptionSort, setSelectedOptionSort] = useState("");
  const [selectedOptionOrder, setSelectedOptionOrder] = useState("");
  const { searchParams, setSearchParams } = useContext(SearchParamsContext);
  const { isSearchOpen } = useContext(SearchOpenContext);

  function handleSelectedOptionSort(e) {
    const sortValue = e.target.value;
    const finalsortValue = sortValue === "Sort By" ? null : sortValue;

    setSelectedOptionSort(finalsortValue);
    const newParams = new URLSearchParams(searchParams);
    if (finalsortValue) {
      newParams.set("sort_by", finalsortValue);
    } else {
      newParams.delete("sort_by");
    }

    setSearchParams(newParams);
  }

  function handleSelectedOptionOrder(e) {
    const orderValue = e.target.value;
    const finalOrderValue = orderValue === "Select Option" ? null : orderValue;

    setSelectedOptionOrder(finalOrderValue);
    const newParams = new URLSearchParams(searchParams);
    if (finalOrderValue) {
      newParams.set("order", finalOrderValue);
    } else {
      newParams.delete("order");
    }

    setSearchParams(newParams);
  }

  console.log(selectedOptionSort);
  console.log(selectedOptionOrder);

  return (
    <>
      {!isSearchOpen && width < 640 ? (
        <div className="w-full h-[54px] flex justify-between items-center pl-3  p-2 sm:pl-[4.6rem] border-b  sm:border-gray-200">
          <div className=" flex">
            <SelectComponent
              selectStyle="selectMobile"
              defaultOption="Sort By"
              optionArray={sortByArr}
              handleChange={handleSelectedOptionSort}
              selectedOption={selectedOptionSort}
            />
            <SelectComponent
              selectStyle="selectMobile"
              defaultOption="Order By"
              optionArray={orderByArr}
              handleChange={handleSelectedOptionOrder}
              selectedOption={selectedOptionOrder}
            />
          </div>

          <span>
            <IoIosOptions
              className="text-primary text-[22px] mr-1 cursor-pointer"
              onClick={() => showModal(<TopicAccordion />)}
            />
          </span>
        </div>
      ) : isSearchOpen && width < 640 ? null : (
        <div className="w-full h-[54px] flex justify-between items-center pl-3  p-2 sm:pl-[4.6rem] border-b  sm:border-gray-200">
          <div className=" flex">
            <SelectComponent
              selectStyle="selectMobile"
              defaultOption="Sort By"
              optionArray={sortByArr}
              handleChange={handleSelectedOptionSort}
              selectedOption={selectedOptionSort}
            />
            <SelectComponent
              selectStyle="selectMobile"
              defaultOption="Order By"
              optionArray={orderByArr}
              handleChange={handleSelectedOptionOrder}
              selectedOption={selectedOptionOrder}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default OptionsContainer;
