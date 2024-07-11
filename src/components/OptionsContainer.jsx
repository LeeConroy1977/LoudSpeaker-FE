import React, { useContext } from "react";
import SelectComponent from "../reuseable-components/SelectComponent";
import { IoIosOptions } from "react-icons/io";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { useModal } from "../contexts/ModalContext";
import TopicAccordion from "./TopicAccordion";

const OptionsContainer = () => {
  const { width, height } = useContext(ScreenSizeContext);
  const { showModal } = useModal();

  return (
    <div className="w-full h-[54px] flex justify-between items-center p-2 sm:pl-[4.6rem] border-b  sm:border-gray-200">
      <div className=" flex">
        <SelectComponent selectStyle="selectMobile" />
        <SelectComponent selectStyle="selectMobile" />
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
