import React from "react";
import Button from "../reuseable-components/Button";
import Avatar from "../reuseable-components/Avatar";
import { IoIosCloseCircleOutline } from "react-icons/io";
import SelectComponent from "../reuseable-components/SelectComponent";

const ComposeForm = ({ handleComposeOpen }) => {
  return (
    <div className="w-full h-[400px] flex justify-between border-gray-200 border-b  p-4">
      <div className="w-[12%]">
        <Avatar avatarStyle="avatarMain" />
      </div>
      <form className=" flex flex-col  w-full h-[80%] ml-2">
        <div className="flex items-center  w-full h-[22%]">
          <SelectComponent selectStyle="selectForm" />
          <SelectComponent selectStyle="selectForm" />
        </div>
        <label className="text-[0.65rem] font-semibold sm:mt-4 sm:ml-2 text-primary ">
          Title
        </label>
        <input
          type="text"
          className="input h-[2.6rem] rounded-xl sm:mt-1 border border-gray-200 focus:outline-none focus:border-primary focus:border-2 "
        />
        <label className="text-[0.65rem] font-semibold sm:mt-3 sm:ml-2 text-primary ">
          Body
        </label>
        <input
          type="text"
          className="input h-[8rem] rounded-xl sm:mt-1  border border-gray-200 focus:outline-none focus:border-primary focus:border-2"
        />
        <label className="text-[0.65rem] font-semibold sm:mt-3 sm:ml-2 text-primary">
          Image URL
        </label>
        <input
          type="text"
          className="input h-[2.6rem] rounded-xl sm:mt-1  border border-gray-200 focus:outline-none focus:border-primary focus:border-2"
        />
      </form>
      <div className="flex flex-col justify-between items-end">
        <IoIosCloseCircleOutline
          onClick={handleComposeOpen}
          className="w-[1.8rem] h-[1.8rem] text-primary cursor-pointer"
        />
        <Button buttonStyle="buttonMedium">Post</Button>
      </div>
    </div>
  );
};

export default ComposeForm;
