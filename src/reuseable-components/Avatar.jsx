import React from "react";

const Avatar = ({ avatarStyle }) => {
  return (
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcG7bjaEFwSdVs4KvkIleUaasOjgFKrf7z6g&s"
      className={`${avatarStyle}`}
    />
  );
};

export default Avatar;
