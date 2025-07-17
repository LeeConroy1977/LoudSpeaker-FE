import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SelectComponent from "../reuseable-components/SelectComponent";
import { IoIosOptions } from "react-icons/io";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { useModal } from "../contexts/ModalContext";
import TopicAccordion from "./TopicAccordion";
import sortByArr from "../../data/sortByOptions";
import orderByArr from "../../data/orderByOptions";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import { TopicsOpenContext } from "../contexts/TopicsOpenContext";
import { ArticlesContext } from "../contexts/ArticlesContext";

const OptionsContainer = () => {
  const { width } = useContext(ScreenSizeContext);
  const { showModal } = useModal();
  const {
    state: { totalArticles },
  } = useContext(ArticlesContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOptionSort, setSelectedOptionSort] = useState(
    searchParams.get("sort_by") || ""
  );
  const [selectedOptionOrder, setSelectedOptionOrder] = useState(
    searchParams.get("order") || ""
  );
  const { isSearchOpen } = useContext(SearchOpenContext);
  const { setIsTopicsOpen } = useContext(TopicsOpenContext);

  function handleSelectedOptionSort(e) {
    const sortValue = e.target.value;
    const finalSortValue = sortValue === "Sort By" ? null : sortValue;

    setSelectedOptionSort(finalSortValue);
    const newParams = new URLSearchParams(searchParams);
    if (finalSortValue) {
      newParams.set("sort_by", finalSortValue);
    } else {
      newParams.delete("sort_by");
    }

    setSearchParams(newParams);
  }

  function handleSelectedOptionOrder(e) {
    const orderValue = e.target.value;
    const finalOrderValue = orderValue === "Order By" ? null : orderValue;

    setSelectedOptionOrder(finalOrderValue);
    const newParams = new URLSearchParams(searchParams);
    if (finalOrderValue) {
      newParams.set("order", finalOrderValue);
    } else {
      newParams.delete("order");
    }

    setSearchParams(newParams);
  }

  return (
    <>
      {!isSearchOpen && width < 640 ? (
        <div className="w-full h-[54px] flex justify-between items-center pl-3 p-2 sm:pl-[4.6rem] border-b sm:border-gray-200 dark:border-primary">
          <div className="flex">
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
              onClick={() => {
                setIsTopicsOpen(true);
                showModal(<TopicAccordion />);
              }}
            />
          </span>
        </div>
      ) : isSearchOpen && width < 640 ? null : (
        <div className="w-full h-[54px] flex justify-between items-center pl-3 p-2 sm:pl-[4.6rem] border-b sm:border-gray-200 dark:border-primary">
          <div className="flex">
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
          {totalArticles && (
            <p className="text-[12px] text-primary dark:text-darkTextPrimary font-semibold mr-3">
              {totalArticles} articles...
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default OptionsContainer;
