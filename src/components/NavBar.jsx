import React, { useContext } from "react";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import Input from "./Input";
import Logo from "./Logo";
import Button from "../reuseable-components/Button";
import Avatar from "../reuseable-components/Avatar";
import { FaSearch } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

const NavBar = () => {
  const { width, height } = useContext(ScreenSizeContext);
  return (
    <nav className=" row-span-1 col-span-3  flex justify-between items-center border-b border-l border-r border-gray-300">
      <Logo />
      {width > 640 && <Input />}
      <div className="flex items-center mx-2.5 sm:mx-8 gap-4 sm:gap-8">
        {width > 640 && <Button buttonStyle="buttonLarge">Sign In</Button>}
        {width < 640 && <FaSearch className="w-5 h-5 text-primary" />}
        {width < 640 && <IoIosAddCircle className="w-7 h-7 text-primary" />}
        <Avatar avatarStyle="avatarMobile sm:avatarLarge" />
      </div>
    </nav>
  );
};

export default NavBar;
