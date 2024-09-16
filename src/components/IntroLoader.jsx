import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { Oval } from "react-loader-spinner";
import { BsFillInfoSquareFill } from "react-icons/bs";

const IntroLoader = () => {
  const [loadingStage, setLoadingStage] = useState("initial");
  const [visible, setVisible] = useState({
    logo: true,
    message1: false,
    message2: false,
    spinner: false,
    info: false,
  });

  useEffect(() => {
    if (loadingStage === "initial") {
      const timers = [
        setTimeout(
          () => setVisible((prev) => ({ ...prev, message1: true })),
          2000
        ),
        setTimeout(
          () => setVisible((prev) => ({ ...prev, message2: true })),
          4000
        ),
        setTimeout(
          () => setVisible((prev) => ({ ...prev, spinner: true })),
          4000
        ),
        setTimeout(() => setVisible((prev) => ({ ...prev, info: true })), 6000),
      ];

      return () => {
        timers.forEach((timer) => clearTimeout(timer));
      };
    }
  }, [loadingStage]);

  return (
    <div className="absolute sm:w-[400px] h-[400px] flex flex-col items-center justify-start left-1/2 transform -translate-x-1/2 top-4 ml-auto mr-auto bg-secondaryBg rounded-lg p-10">
      {loadingStage === "initial" && (
        <>
          {visible.logo && (
            <div className="mt-2">
              <Logo />
            </div>
          )}
          {visible.message1 && (
            <p className="text-darkTextPrimary mt-8 sm:text-[14px]">
              The initial render may take a few moments!
            </p>
          )}
          {visible.message2 && (
            <p className="text-darkTextPrimary mt-4 sm:text-[14px]">
              Thank you for your patience...
            </p>
          )}
          {visible.spinner && (
            <div className="mt-10">
              <Oval
                color="#456990"
                secondaryColor="#456990"
                height="40"
                width="40"
              />
            </div>
          )}
          {visible.info && (
            <div className="flex items-center m-4 mt-6">
              <span>
                <BsFillInfoSquareFill className="text-primary text-[20px]" />
              </span>
              <p className="text-darkTextPrimary mt-4 sm:text-[14px] pl-4">
                To post articles, comments and vote, you must sign in as an
                existing user...
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default IntroLoader;
