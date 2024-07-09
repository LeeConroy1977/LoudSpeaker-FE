import React, { useContext, useEffect, useState } from "react";
import Logo from "./Logo";
import users from "../../data/users";
import UserCard from "./UserCard";
import { UserContext } from "../contexts/UserContext";
import Button from "../reuseable-components/Button";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { IoIosCloseCircleOutline } from "react-icons/io";

const SignIn = ({ handleSignInContainerClosed }) => {
  const { user, setUser } = useContext(UserContext);
  const { width, height } = useContext(ScreenSizeContext);

  useEffect(() => {}, [handleSelectUser]);

  function handleSelectUser(username) {
    users.map((user) => {
      if (user.username === username) {
        setUser(user);
      }
    });
  }

  return (
    <div className="flex flex-col w-full h-full items-center relative ">
      {width > 640 && (
        <div
          className="w-[30px] h-[30px]  flex justify-center items-center sm:items-start sm:ml-auto bg-white rounded-full cursor-pointer absolute right-0"
          onClick={() => handleSignInContainerClosed(true)}
        >
          <IoIosCloseCircleOutline className=" text-primary text-[28px] font-bold " />
        </div>
      )}

      <div className="flex justify-center ">
        <Logo />
      </div>
      {!user.username ? (
        <>
          <p className="text-[0.85rem] text-primary text-center font-semibold  mt-6 sm:mt-8 pl-2 pr-2">
            You must be logged-in to access this feature!
          </p>
          <p className="text-[0.85rem] text-primary  text-center font-semibold  mt-2 pl-2 pr-2">
            Please select an existing user to sign in.
          </p>
          <div className="w-full h-[70%]  flex gap-4 justify-center flex-row items-start flex-wrap mt-4 sm:mt-7">
            {users &&
              users.map((user) => {
                return (
                  <UserCard
                    key={user.username}
                    person={user}
                    handleClick={handleSelectUser}
                    avatarStyle="avatarMobileLarge"
                  />
                );
              })}
          </div>
        </>
      ) : (
        <>
          <p className="text-[0.9rem] text-primary text-center font-semibold  mt-7 mb-5 pl-2 pr-2">
            You have signed in as {user.username}
          </p>
          <UserCard
            person={user}
            avatarStyle="avatarMobileExtraLarge"
            handleClick={handleSelectUser}
          />
          <p className="text-[0.9rem] text-primary text-center font-semibold  mt-6 mb-4 pl-2 pr-2">
            As {user.username}, you can now:
          </p>
          <ul>
            <li className="text-[0.9rem] text-primary text-center font-medium  mt-2  pl-2 pr-2">
              Post an article
            </li>
            <li className="text-[0.9rem] text-primary text-center font-medium  mt-2  pl-2 pr-2">
              Leave a comment
            </li>
            <li className="text-[0.9rem] text-primary text-center font-medium  mt-2  pl-2 pr-2">
              {" "}
              Delete a comment
            </li>
            <li className="text-[0.9rem] text-primary text-center font-medium  mt-2  pl-2 pr-2">
              Like or dislike
            </li>
          </ul>
          <div
            className="w-full h-[4rem] flex items-end justify-center mt-5
          "
          >
            <Button
              buttonStyle={width < 640 ? "buttonMedium" : "buttonLarge"}
              handleClick={handleSignInContainerClosed}
            >
              Continue
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SignIn;
