import React, { createContext, useState } from "react";
import NotificationPopUp from "../reuseable-components/NotificationPopUp";

export const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    duration: 3000,
  });

  const showPopup = (message, duration = 3000) => {
    setPopup({ show: true, message, duration });
    setTimeout(
      () => setPopup({ show: false, message: "", duration: 3000 }),
      duration
    );
  };

  return (
    <PopupContext.Provider value={showPopup}>
      {children}
      {popup.show && <NotificationPopUp message={popup.message} />}
    </PopupContext.Provider>
  );
};
