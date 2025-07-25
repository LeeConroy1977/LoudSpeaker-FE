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
      {width < 900 ? (
        <div className="flex flex-col w-[100%]">
          <p className="flex items-center text-[10px] tablet-portrait:text-[11px]  text-primary dark:text-darkTextPrimary  ml-2 font-bold">
            @{username}
            <BsDot className="text-[20px]" />
            {timeDetail}
          </p>
        </div>
      ) : (
        <>
          {" "}
          <span className="text-[12px] tablet:text-[11px] desktop:text-[14px] xl-screen:text-[15px] font-bold text-primary dark:text-darkTextPrimary ml-3">
            {name}
          </span>
          {"  "}
          <span className=" text-primary  ml-0.5">
            <IoCheckmarkCircleSharp className=" text-[18px] fill-primary text-white" />
          </span>
          <div className="flex items-center text-[10px] tablet-[5px]  desktop:text-[12px] xl-screen:text-[13px] text-primary dark:text-darkTextPrimary ml-1">
            <p>@{username}</p>
            <span>
              <BsDot className="text-[20px]" />
            </span>
            <p>{timeDetail}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetail;
