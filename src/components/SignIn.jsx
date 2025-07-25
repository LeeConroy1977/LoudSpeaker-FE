import React, { useContext, useEffect, useState } from "react";
import users from "../../data/users";
import UserCard from "./UserCard";
import { UserContext } from "../contexts/UserContext";
import Button from "../reuseable-components/Button";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useModal } from "../contexts/ModalContext";

const SignIn = () => {
  const [isFocusedIndex, setIsFocusedIndex] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const { width } = useContext(ScreenSizeContext);
  const { hideModal } = useModal();

  useEffect(() => {}, [handleSelectUser]);

  function handleSelectUser(username) {
    const selectedUser = users.find((user) => user.username === username);
    if (selectedUser) {
      setUser(selectedUser);
    }
  }

  function handleFocusToggle(index) {
    setIsFocusedIndex(index);
  }

  return (
    <div className="flex flex-col w-full h-full items-center relative dark:bg-secondaryBg ">
      <div
        className="w-[30px] h-[30px]  flex justify-center items-center sm:items-start sm:ml-auto bg-white dark:bg-secondaryBg rounded-full cursor-pointer absolute right-0"
        onClick={hideModal}>
        <IoIosCloseCircleOutline className=" text-primary text-[28px] font-bold " />
      </div>

      <div className="flex justify-center mt-5 tablet-portrait:mt-12 tablet:mt-8 ">
        <div className="mx-2.5 tablet:mx-8 desktop:mx-9 xl-screen:mx-10 cursor-pointer">
          <h2 className="text-primary dark:text-darkTextPrimary font-bold text-xl tablet-portrait:text-[32px] tablet:text-[28px] desktop:text-3xl  font-lobster">
            LoudSpeaker
          </h2>
        </div>
      </div>
      {!user.username ? (
        <>
          <p className="text-[0.85rem] tablet-portrait:text-[1rem] tablet:text-[0.85rem] text-primary dark:text-darkTextPrimary  text-center font-semibold  mt-5 mb-5 tablet-portrait:mb-0 tablet-portrait:mt-8  tablet:mt-8 pl-2 pr-2">
            Please select an existing user to sign in.
          </p>
          <div className="w-full h-[70%]  flex gap-4 justify-center flex-row items-start flex-wrap mt-4 tablet-portrait:mt-8  tablet:mt-7">
            {users &&
              users.map((user, i) => {
                return (
                  <UserCard
                    key={user.username}
                    person={user}
                    handleClick={handleSelectUser}
                    avatarStyle={`avatarMobileLarge  ${
                      isFocusedIndex === i
                        ? "dark:border-secondaryBg"
                        : "dark:border-primary"
                    }`}
                    handleMouseEnter={() => handleFocusToggle(i)}
                  />
                );
              })}
          </div>
        </>
      ) : (
        <>
          <p className="text-[0.9rem] tablet-portrait:text-[1rem] tablet:text-[0.9rem] text-primary dark:text-darkTextPrimary text-center font-semibold  mt-7 tablet-portrait:mt-8 tablet:mt-6 mb-5 pl-2 pr-2">
            You have signed in as {user.username}
          </p>
          <UserCard
            person={user}
            avatarStyle="avatarMobileExtraLarge"
            handleClick={handleSelectUser}
          />
          <p className="text-[0.9rem] tablet-portrait:text-[1rem] tablet:text-[0.9rem] text-primary dark:text-darkTextPrimary text-center font-semibold  mt-6 mb-4 pl-2 pr-2">
            As {user.username}, you can now:
          </p>
          <ul>
            <li className="text-[0.9rem] tablet-portrait:text-[1rem] tablet:text-[0.9rem] text-primary dark:text-darkTextPrimary text-center font-medium  mt-2  pl-2 pr-2">
              Post an article
            </li>
            <li className="text-[0.9rem] tablet-portrait:text-[1rem] tablet:text-[0.9rem] text-primary dark:text-darkTextPrimary text-center font-medium  mt-2  pl-2 pr-2">
              Leave a comment
            </li>
            <li className="text-[0.9rem] tablet-portrait:text-[1rem] tablet:text-[0.9rem] text-primary  dark:text-darkTextPrimary text-center font-medium  mt-2  pl-2 pr-2">
              {" "}
              Delete a comment
            </li>
            <li className="text-[0.9rem] tablet-portrait:text-[1rem] tablet:text-[0.9rem] text-primary dark:text-darkTextPrimary text-center font-medium  mt-2  pl-2 pr-2">
              Like or dislike
            </li>
          </ul>
          <div
            className="w-full h-[4rem] flex items-end justify-center mt-5
          ">
            <Button
              buttonStyle={
                width < 900
                  ? "buttonSignInMobile dark:text-darkTextPrimary dark:bg-primary"
                  : "buttonSignInLarge dark:text-darkTextPrimary dark:bg-primary"
              }
              handleClick={hideModal}>
              Continue
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SignIn;
