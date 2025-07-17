import React from "react";

const Button = ({
  children,
  buttonStyle,
  handleClick,
  handleDisabled,
  type,
}) => {
  return (
    <button
      className={`${buttonStyle} rounded-full `}
      {...(handleClick ? { onClick: handleClick } : {})}
      disabled={handleDisabled}
      type={type}>
      {children}
    </button>
  );
};

export default Button;
