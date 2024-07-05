import React, { useContext } from "react";
import Avatar from "../reuseable-components/Avatar";
import Button from "../reuseable-components/Button";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";

const CommentPostContainer = () => {
  const { width, height } = useContext(ScreenSizeContext);
  return (
    <div className="w-full h-[58px] sm:h-[80px] flex items-center justify-between p-4 border-gray-200 border-b">
      <Avatar avatarStyle={width < 640 ? "avatarMobile" : "avatarMain"} />
      <p className="mr-auto ml-3 text-[13px] sm:text-[16px] text-primary font-semibold ">
        Post a comment...
      </p>

      <Button buttonStyle="buttonMobile">Post</Button>
    </div>
  );
};

export default CommentPostContainer;
