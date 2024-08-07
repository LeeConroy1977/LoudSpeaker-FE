import React, { useEffect } from "react";

const NotificationPopUp = ({ message, duration, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-primary text-white px-8 py-6 rounded opacity-90">
      {message}
    </div>
  );
};

export default NotificationPopUp;
