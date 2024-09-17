import React, { useContext, useEffect } from "react";
import Avatar from "../reuseable-components/Avatar";
import { UserContext } from "../contexts/UserContext";

const UserCard = ({ person, handleClick, avatarStyle, handleMouseEnter }) => {
  const { username, avatar_url } = person;

  const { user } = useContext(UserContext);

  console.log(username);

  return (
    <div
      className={`${
        user.username
          ? "w-[60%] h-[25%] pt-4 sm:w-[40%] "
          : "w-[38%] h-[30%] pt-3 hover:bg-gray-100 dark:hover:bg-primary  hover:border-gray-300 "
      } flex flex-col justify-start items-center border border-gray-200 dark:border-primary p-2  rounded-lg shadow-lg cursor-pointer `}
      onClick={() => {
        handleClick(username);
      }}
      onMouseEnter={handleMouseEnter}
    >
      <Avatar avatarStyle={avatarStyle} avatarURL={avatar_url} />
      <p
        className={`${
          user.username ? "text-[0.9rem]" : "text-[0.8rem]"
        }  text-primary dark:text-darkTextPrimary
       font-semibold mt-4`}
      >
        {username}
      </p>
    </div>
  );
};

export default UserCard;
