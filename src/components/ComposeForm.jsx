import React, { useContext } from "react";
import Button from "../reuseable-components/Button";
import Avatar from "../reuseable-components/Avatar";
import { IoIosCloseCircleOutline } from "react-icons/io";
import SelectComponent from "../reuseable-components/SelectComponent";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { UserContext } from "../contexts/UserContext";
import { CgProfile } from "react-icons/cg";

const ComposeForm = ({ handleComposeOpen, isComposeOpen }) => {
  const { width } = useContext(ScreenSizeContext);
  const { user } = useContext(UserContext);
  return (
    <div
      className="flex flex-col items-center justify-start
       w-full h-[420px] sm:w-full sm:h-[480px]  border-gray-200 border-b  sm:p-4 p-3 pt-0"
    >
      <div className="flex items-center justify-between w-full h-[4.4rem] ">
        <Avatar
          avatarStyle={width < 640 ? "avatarMobile" : "avatarMain"}
          avatarURL={user.avatar_url}
        />

        <div className="flex items-center  w-full h-[22%] ml-2">
          <SelectComponent selectStyle="selectMobile" />
          <SelectComponent selectStyle="selectMobile" />
        </div>
        <IoIosCloseCircleOutline
          onClick={handleComposeOpen}
          className="w-[1.8rem] h-[1.8rem] mb-auto text-primary cursor-pointer"
        />
      </div>
      <form className=" flex flex-col   w-full h-[80%] sm:w-[80%] mt-2 pl-2 pr-2 sm:pl-0 sm:pr:0  sm:ml-2 ">
        <label className="text-[0.65rem] font-semibold mt-1 ml-2 sm:mt-4  text-primary ">
          Title
        </label>
        <input
          type="text"
          className="input h-[2.6rem] rounded-xl sm:mt-1 border border-gray-200 focus:outline-none focus:border-primary focus:border-2 "
        />
        <label className="text-[0.65rem] font-semibold mt-4 ml-2 sm:mt-3  text-primary ">
          Body
        </label>
        <input
          type="text"
          className="input h-[8rem] rounded-xl sm:mt-1  border border-gray-200 focus:outline-none focus:border-primary focus:border-2"
        />
        <label className="text-[0.65rem] font-semibold mt-4 ml-2 sm:mt-3  text-primary">
          Image URL
        </label>
        <input
          type="text"
          className="input h-[2.6rem] rounded-xl sm:mt-1  border border-gray-200 focus:outline-none focus:border-primary focus:border-2"
        />
      </form>
      <div className="flex justify-end items-center sm:w-full sm:h-[240px] mt-4">
        <Button
          buttonStyle={`${width < 640 ? "buttonMobile" : "buttonMedium"}`}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default ComposeForm;
