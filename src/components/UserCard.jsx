import React, { useContext, useEffect } from "react";
import Avatar from "../reuseable-components/Avatar";
import { UserContext } from "../contexts/UserContext";

const UserCard = ({ person, handleClick, avatarStyle }) => {
  const { username, name, avatar_url } = person;

  const { user } = useContext(UserContext);

  console.log(username);

  return (
    <div
      className={`${
        user.username
          ? "w-[60%] h-[25%] pt-4 sm:w-[40%]"
          : "w-[38%] h-[30%] pt-3 hover:bg-gray-100 hover:border-gray-300"
      } flex flex-col justify-start items-center border border-gray-200 p-2  rounded-lg shadow-lg cursor-pointer `}
      onClick={() => {
        handleClick(username);
      }}
    >
      <Avatar avatarStyle={avatarStyle} avatarURL={avatar_url} />
      <p
        className={`${
          user.username ? "text-[0.9rem]" : "text-[0.8rem]"
        }  text-primary 
       font-semibold mt-4`}
      >
        {username}
      </p>
    </div>
  );
};

export default UserCard;
