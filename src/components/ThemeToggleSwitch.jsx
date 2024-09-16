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
      {width < 640 ? (
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
            <MdLightMode className="text-yellow-400 w-[18px] h-[18px] cursor-pointer" />
          </span>
          <div
            className="relative flex items-center mr-1 ml-1  p-1 sm:w-[56px] sm:h-[25px] bg-white dark:bg-secondaryBg rounded-full border-2 border-primary cursor-pointer"
            onClick={toggleTheme}
          >
            <div
              className={`absolute transition-transform duration-300 ease-in-out sm:w-[17px]  sm:h-[17px] bg-primary rounded-full ${
                theme === "dark" ? "translate-x-7" : "translate-x-0"
              }`}
            ></div>
          </div>
          <span>
            <MdDarkMode
              className={`${
                theme !== "dark" ? "text-secondaryBg" : "text-darkTextPrimary"
              } [16px] h-[16px] cursor-pointer `}
            />
          </span>
        </>
      )}
    </div>
  );
};

export default ThemeToggleSwitch;
