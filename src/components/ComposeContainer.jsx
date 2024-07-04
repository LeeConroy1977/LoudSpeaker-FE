import React from "react";
import Avatar from "../reuseable-components/Avatar";
import Button from "../reuseable-components/Button";

const ComposeContainer = () => {
  return (
    <div className="w-full h-[80px] flex items-center justify-between p-4 border-gray-200 border-b">
      <Avatar avatarStyle="avatarMain" />
      <p className="mr-auto ml-4 text-[16px] text-primary font-semibold">
        Compose an article...
      </p>
      <Button buttonStyle="buttonMedium">Post</Button>
    </div>
  );
};

export default ComposeContainer;
