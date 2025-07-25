import React, { useContext } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
const ThemeToggleSwitch = () => {
  const { theme, toggleTheme } = useTheme();
  const { width } = useContext(ScreenSizeContext);
  return (
    <div className="flex items-center">
      {width < 900 ? (
        <>
          {theme === "dark" ? (
            <span>
              <MdLightMode
                className="text-yellow-400 w-[24px] h-[24px] cursor-pointer"
                onClick={toggleTheme}
              />
            </span>
          ) : (
            <span>
              <MdDarkMode
                className="text-primary w-[24px] h-[24px] cursor-pointer"
                onClick={toggleTheme}
              />
            </span>
          )}
        </>
      ) : (
        <>
          <span>
            <MdLightMode className="text-yellow-400 tablet:w-[22px] tablet:h-[22px] desktop:w-[26px] desktop:h-[26px] cursor-pointer" />
          </span>
          <div
            className="relative flex items-center mr-1 ml-1 p-1 tablet:w-[60px] tablet:h-[28px] desktop:w-[75px]  desktop:h-[32px] bg-white dark:bg-secondaryBg rounded-full border-2 border-primary cursor-pointer"
            onClick={toggleTheme}>
            <div
              className={`absolute transition-transform duration-300 ease-in-out tablet:w-[18px] tablet:h-[18px] desktop:w-[23px]  desktop:h-[23px] bg-primary rounded-full ${
                theme === "dark" ? "translate-x-7" : "translate-x-0"
              }`}></div>
          </div>
          <span>
            <MdDarkMode
              className={`${
                theme !== "dark" ? "text-secondaryBg" : "text-darkTextPrimary"
              } tablet:w-[22px] tablet:h-[22px] desktop:w-[26px] desktop:h-[26px] cursor-pointer `}
            />
          </span>
        </>
      )}
    </div>
  );
};

export default ThemeToggleSwitch;
