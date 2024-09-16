import React, { useContext, useState } from "react";
import Avatar from "../reuseable-components/Avatar";
import Button from "../reuseable-components/Button";
import { UserContext } from "../contexts/UserContext";
import { useModal } from "../contexts/ModalContext";
import { CgProfile } from "react-icons/cg";
import SignIn from "./SignIn";
import useComposeToggle from "../hooks/UseComposeOpenToggle";
import { useTheme } from "../contexts/ThemeContext";

const ComposeContainer = ({ setIsDisabled }) => {
  const { user } = useContext(UserContext);
  const { toggleComposeOpen } = useComposeToggle();
  const { theme } = useTheme();
  const { showModal } = useModal();

  return (
    <div
      className="w-full h-[80px] flex items-center justify-between p-3 border-gray-200 dark:border-primary border-b "
      onClick={() => {
        !user.username && showModal(<SignIn />);
        toggleComposeOpen();
        setIsDisabled(true);
      }}
    >
      <div className="sm:w-[54px] sm:h-[54px] flex justify-start items-center ">
        {user.username ? (
          <Avatar avatarStyle="avatarMain" avatarURL={user.avatar_url} />
        ) : (
          <div>
            <CgProfile className="avatarMobile sm:w-[54px] sm:h-[54px] border-none text-primary cursor-pointer" />
          </div>
        )}
      </div>

      <p className="mr-auto ml-3 text-[16px] text-primary font-semibold ">
        Compose an article...
      </p>

      <Button
        buttonStyle={theme === "dark" ? "buttonMediumDark" : "buttonMedium"}
      >
        Post
      </Button>
    </div>
  );
};

export default ComposeContainer;
