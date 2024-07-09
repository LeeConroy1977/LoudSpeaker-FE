import React, { useContext } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";

const Model = ({ children, handleClick, isTopicContainerOpen }) => {
  const { width, height } = useContext(ScreenSizeContext);
  return (
    <div className="sm:flex sm:justify-center   sm:items-center w-[100%] h-[660px] sm:w-[44%] sm:h-[700px] top-[0px] sm:top-[3rem]  z-50 rounded-xl overflow-y-hidden absolute p-2  sm:mr-auto">
      {width < 640 && (
        <div
          className="w-[30px] h-[30px]  flex justify-center items-center sm:items-start ml-auto bg-white rounded-full cursor-pointer"
          onClick={handleClick}
        >
          <IoIosCloseCircleOutline
            className=" text-primary text-[28px] font-bold"
            onClick={handleClick}
          />
        </div>
      )}

      <div className="sm: flex sm:justify-center  w-[86%] h-[550px] sm:h-[580px]  top-10 bg-white z-50 rounded-xl overflow-y-hidden absolute p-2 ml-5 sm:ml-0">
        <div
          className={`w-[94%] h-[550px]  top-4 bg-white z-50 rounded-xl ${
            isTopicContainerOpen && overflow - y - scroll
          } absolute p-2 pt-0`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Model;
