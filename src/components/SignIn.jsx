import React, { useContext, useEffect, useState } from "react";
import Logo from "./Logo";
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

  console.log(isFocusedIndex);

  return (
    <div className="flex flex-col w-full h-full items-center relative dark:bg-secondaryBg ">
      <div
        className="w-[30px] h-[30px]  flex justify-center items-center sm:items-start sm:ml-auto bg-white dark:bg-secondaryBg rounded-full cursor-pointer absolute right-0"
        onClick={hideModal}
      >
        <IoIosCloseCircleOutline className=" text-primary text-[28px] font-bold " />
      </div>

      <div className="flex justify-center mt-5 sm:mt-4 ">
        <Logo />
      </div>
      {!user.username ? (
        <>
          <p className="text-[0.85rem] text-primary dark:text-darkTextPrimary  text-center font-semibold  mt-5 mb-5 sm:mb-0 sm:mt-8 pl-2 pr-2">
            Please select an existing user to sign in.
          </p>
          <div className="w-full h-[70%]  flex gap-4 justify-center flex-row items-start flex-wrap mt-4 sm:mt-7 ">
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
          <p className="text-[0.9rem] text-primary dark:text-darkTextPrimary text-center font-semibold  mt-7 mb-5 pl-2 pr-2">
            You have signed in as {user.username}
          </p>
          <UserCard
            person={user}
            avatarStyle="avatarMobileExtraLarge"
            handleClick={handleSelectUser}
          />
          <p className="text-[0.9rem] text-primary dark:text-darkTextPrimary text-center font-semibold  mt-6 mb-4 pl-2 pr-2">
            As {user.username}, you can now:
          </p>
          <ul>
            <li className="text-[0.9rem] text-primary dark:text-darkTextPrimary text-center font-medium  mt-2  pl-2 pr-2">
              Post an article
            </li>
            <li className="text-[0.9rem] text-primary dark:text-darkTextPrimary text-center font-medium  mt-2  pl-2 pr-2">
              Leave a comment
            </li>
            <li className="text-[0.9rem] text-primary  dark:text-darkTextPrimary text-center font-medium  mt-2  pl-2 pr-2">
              {" "}
              Delete a comment
            </li>
            <li className="text-[0.9rem] text-primary dark:text-darkTextPrimary text-center font-medium  mt-2  pl-2 pr-2">
              Like or dislike
            </li>
          </ul>
          <div
            className="w-full h-[4rem] flex items-end justify-center mt-5
          "
          >
            <Button
              buttonStyle={
                width < 640
                  ? "buttonSignInMobile dark:text-darkTextPrimary dark:bg-primary"
                  : "buttonSignInLarge dark:text-darkTextPrimary dark:bg-primary"
              }
              handleClick={hideModal}
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
