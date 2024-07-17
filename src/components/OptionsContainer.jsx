import React, { useContext, useState } from "react";
import SelectComponent from "../reuseable-components/SelectComponent";
import { IoIosOptions } from "react-icons/io";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { useModal } from "../contexts/ModalContext";
import TopicAccordion from "./TopicAccordion";
import sortByArr from "../../data/sortByOptions";
import orderByArr from "../../data/orderByOptions";
import { SearchParamsContext } from "../contexts/searchParamsContext";

const OptionsContainer = () => {
  const { width } = useContext(ScreenSizeContext);
  const { showModal } = useModal();
  const [selectedOptionSort, setSelectedOptionSort] = useState("");
  const [selectedOptionOrder, setSelectedOptionOrder] = useState("");
  const { searchParams, setSearchParams } = useContext(SearchParamsContext);

  function handleSelectedOptionSort(e) {
    const sortValue = e.target.value;
    setSelectedOptionSort(sortValue);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", sortValue);
    setSearchParams(newParams);
  }
  function handleSelectedOptionOrder(e) {
    const orderValue = e.target.value;
    setSelectedOptionOrder(orderValue);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", orderValue);
    setSearchParams(newParams);
  }

  console.log(selectedOptionSort);
  console.log(selectedOptionOrder);
  return (
    <div className="w-full h-[54px] flex justify-between items-center p-2 sm:pl-[4.6rem] border-b  sm:border-gray-200">
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
      {width < 640 && (
        <span>
          <IoIosOptions
            className="text-primary text-[22px] mr-1 cursor-pointer"
            onClick={() => showModal(<TopicAccordion />)}
          />
        </span>
      )}
    </div>
  );
};

export default OptionsContainer;
