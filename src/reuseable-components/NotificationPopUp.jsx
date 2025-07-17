import React, { useContext, useEffect } from "react";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";

const NotificationPopUp = ({
  message,
  duration,
  onClose = () => console.warn("onClose not provided"),
}) => {
  const { width } = useContext(ScreenSizeContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`${
        width < 640 ? "text-[13px] left-[70px]" : "text-[15px] left-[39%]"
      } flex items-center justify-center w-[230px] h-[80px] sm:w-[280px] sm:h-[80px] fixed bottom-10  bg-primary text-white rounded-lg font-semibold`}>
      {message}
    </div>
  );
};

export default NotificationPopUp;
