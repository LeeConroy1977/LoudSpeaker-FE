import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Model = ({ children, handleClick }) => {
  return (
    <div className="w-[100%] h-[640px]  top-0  z-50 rounded-xl overflow-y-hidden absolute p-2 ">
      <div
        className="w-[30px] h-[30px] flex justify-center items-center ml-auto bg-white rounded-full cursor-pointer"
        onClick={handleClick}
      >
        <IoIosCloseCircleOutline
          className=" text-primary text-[28px] font-bold"
          onClick={handleClick}
        />
      </div>
      <div className="w-[86%] h-[520px]  top-10 bg-white z-50 rounded-xl overflow-y-hidden absolute p-2 ml-5">
        <div className="w-[94%] h-[560px] ml-2 top-4 bg-white z-50 rounded-xl overflow-y-scroll absolute p-2 pt-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Model;
