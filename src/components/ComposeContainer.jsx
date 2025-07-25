import React, { useContext, useState } from "react";
import Avatar from "../reuseable-components/Avatar";
import Button from "../reuseable-components/Button";
import { UserContext } from "../contexts/UserContext";
import { useModal } from "../contexts/ModalContext";
import { CgProfile } from "react-icons/cg";
import SignIn from "./SignIn";
import useComposeToggle from "../hooks/UseComposeOpenToggle";
import { useTheme } from "../contexts/ThemeContext";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";

const ComposeContainer = ({ setIsDisabled }) => {
  const { user } = useContext(UserContext);
  const { width } = useContext(ScreenSizeContext);
  const { toggleComposeOpen } = useComposeToggle();
  const { theme } = useTheme();
  const { showModal } = useModal();

  return (
    <div
      className="w-full h-[80px] xl-screen:h-[100px] flex items-center justify-between p-3  border-gray-200 dark:border-primary border-b "
      onClick={() => {
        !user.username && showModal(<SignIn />);
        toggleComposeOpen();
        setIsDisabled(true);
      }}>
      <div className="tablet:w-[54px] tablet:h-[54px] flex justify-start items-center ">
        {user.username ? (
          <Avatar
            avatarStyle={
              width < 900
                ? "avatarMobile"
                : width < 1920
                ? "avatarComposeTablet"
                : "avatarComposeMain"
            }
            avatarURL={user.avatar_url}
          />
        ) : (
          <div>
            <CgProfile className="avatarMobile tablet:w-[46px] tablet:h-[46px] desktop:w-[54px] desktop:h-[54px] border-none text-primary cursor-pointer" />
          </div>
        )}
      </div>

      <p className="mr-auto ml-3 tablet:text-[0.9rem]  desktop:text-[1rem] xl-screen:text-[1.1rem] text-primary font-semibold ">
        Compose an article...
      </p>

      <Button
        buttonStyle={theme === "dark" ? "buttonMediumDark" : "buttonMedium"}>
        Post
      </Button>
    </div>
  );
};

export default ComposeContainer;
