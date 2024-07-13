import React from "react";

const Button = ({ children, buttonStyle, handleClick, handleDisabled }) => {
  return (
    <button
      className={`${buttonStyle} rounded-full `}
      onClick={handleClick}
      disabled={handleDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
