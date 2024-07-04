import React, { useContext } from "react";
import SelectComponent from "../reuseable-components/SelectComponent";
import { IoIosOptions } from "react-icons/io";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";

const OptionsContainer = () => {
  const { width, height } = useContext(ScreenSizeContext);
  return (
    <div className="w-full h-[54px] flex justify-between items-center p-2 border-b  sm:border-gray-200">
      <div className=" flex">
        <SelectComponent selectStyle="selectMobile" />
        <SelectComponent selectStyle="selectMobile" />
      </div>
      {width < 640 && (
        <span>
          <IoIosOptions className="text-primary text-[22px] mr-1" />
        </span>
      )}
    </div>
  );
};

export default OptionsContainer;
