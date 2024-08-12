import React from "react";
import { timeSince } from "../../utilities/time";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

import { BsDot } from "react-icons/bs";

const UserDetail = ({ createdAt, name, username }) => {
  const timeDetail = timeSince(createdAt);
  return (
    <div className="flex items-center">
      <span className="text-[12px] font-bold text-primary ml-3">{name}</span>
      {"  "}
      <span className=" text-primary ml-0.5">
        <IoCheckmarkCircleSharp className=" text-[18px] fill-primary text-white" />
      </span>
      <p className="flex items-center text-[12px] text-primary ml-1">
        {username}
        <BsDot className="text-[20px]" />
        {timeDetail}
      </p>
    </div>
  );
};

export default UserDetail;
