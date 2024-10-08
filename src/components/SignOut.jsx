import React, { useContext } from "react";
import Logo from "./Logo";
import { UserContext } from "../contexts/UserContext";
import Button from "../reuseable-components/Button";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useModal } from "../contexts/ModalContext";
import Avatar from "../reuseable-components/Avatar";

const SignOut = () => {
  const { user, setUser } = useContext(UserContext);
  const { hideModal } = useModal();

  function handleSignOut() {
    setUser({});
  }

  return (
    <div className="flex flex-col w-full h-full items-center relative ">
      <div
        className="w-[30px] h-[30px]  flex justify-center items-center sm:items-start sm:ml-auto bg-white dark:bg-secondaryBg rounded-full cursor-pointer absolute right-0"
        onClick={hideModal}
      >
        <IoIosCloseCircleOutline className=" text-primary text-[28px] font-bold " />
      </div>

      <div className="flex justify-center mt-5 sm:mt-4 ">
        <Logo />
      </div>

      <div className="w-[60%] h-[25%] pt-4 sm:w-[40%] flex flex-col justify-start items-center border border-gray-200 dark:border-primary p-2  rounded-lg shadow-lg cursor-pointer mt-10 ">
        <Avatar avatarStyle="avatarMobileLarge" avatarURL={user.avatar_url} />
        <p className="text-[0.8rem] text-primary dark:text-darkTextPrimary font-semibold mt-4">
          {user.username}
        </p>
      </div>

      <p className="text-[0.9rem] text-primary dark:text-darkTextPrimary text-center font-semibold  mt-[80px] mb-4 px-8 ">
        Are you sure you want to sign out?
      </p>

      <div
        className="w-full h-[8rem] flex flex-col items-center justify-center gap-6 mt-5
          "
      >
        <Button
          buttonStyle="buttonSignOutMobile bg-primary text-darkTextPrimary"
          handleClick={() => {
            handleSignOut();
            hideModal();
          }}
        >
          Sign Out
        </Button>
        <Button
          buttonStyle="buttonSignOutMobile text-darkTextPrimary"
          handleClick={() => {
            hideModal();
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default SignOut;
