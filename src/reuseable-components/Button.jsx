import React from "react";

const Button = ({ children, buttonStyle }) => {
  return (
    <button className={`${buttonStyle} bg-black rounded-full text-white `}>
      {children}
    </button>
  );
};

export default Button;
