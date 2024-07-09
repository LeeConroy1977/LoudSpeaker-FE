import React from "react";

const Button = ({ children, buttonStyle, handleClick }) => {
  return (
    <button
      className={`${buttonStyle} bg-black rounded-full text-white `}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
