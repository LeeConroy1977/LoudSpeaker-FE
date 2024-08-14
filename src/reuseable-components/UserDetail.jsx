import React, { useContext } from "react";
import { timeSince } from "../../utilities/time";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

import { BsDot } from "react-icons/bs";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";

const UserDetail = ({ createdAt, name, username }) => {
  const { width } = useContext(ScreenSizeContext);
  const timeDetail = timeSince(createdAt);
  return (
    <div className="flex items-center">
      {width < 640 ? (
        <div className="flex flex-col w-[100%]">
          <p className="flex items-center text-[10.5px] text-primary ml-2 font-bold">
            @{username}
            <BsDot className="text-[20px]" />
            {timeDetail}
          </p>
        </div>
      ) : (
        <>
          {" "}
          <span className="text-[12px] font-bold text-primary ml-3">
            {name}
          </span>
          {"  "}
          <span className=" text-primary ml-0.5">
            <IoCheckmarkCircleSharp className=" text-[18px] fill-primary text-white" />
          </span>
          <p className="flex items-center text-[10px] text-primary ml-1">
            @{username}
            <BsDot className="text-[20px]" />
            {timeDetail}
          </p>
        </>
      )}
    </div>
  );
};

export default UserDetail;
