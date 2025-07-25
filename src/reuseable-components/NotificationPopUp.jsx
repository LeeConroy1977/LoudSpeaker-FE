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
        width < 640 ? "text-[13px] " : "text-[15px]"
      } absolute flex items-center justify-center w-[230px] h-[80px] tablet-portrait:w-[280px] tablet-portrait:h-[80px]  bottom-10 m-auto bg-primary text-white rounded-lg font-semibold`}>
      {message}
    </div>
  );
};

export default NotificationPopUp;
