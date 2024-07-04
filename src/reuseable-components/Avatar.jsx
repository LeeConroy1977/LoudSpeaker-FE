import React from "react";

const Avatar = ({ avatarStyle, avatarURL }) => {
  return <img src={avatarURL} className={`${avatarStyle}`} />;
};

export default Avatar;
