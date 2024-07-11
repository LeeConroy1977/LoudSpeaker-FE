import React, { useContext } from "react";
import Avatar from "../reuseable-components/Avatar";
import Button from "../reuseable-components/Button";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { CgProfile } from "react-icons/cg";
import { UserContext } from "../contexts/UserContext";
import { useModal } from "../contexts/ModalContext";
import SignIn from "./SignIn";

const CommentPostContainer = ({ handlePostCommentContainerOpen }) => {
  const { width } = useContext(ScreenSizeContext);
  const { user } = useContext(UserContext);
  const { showModal } = useModal();
  return (
    <div
      className="w-full h-[58px] sm:h-[80px] flex items-center justify-between p-4 border-gray-200 border-b"
      onClick={() => {
        handlePostCommentContainerOpen;
        showModal(<SignIn />);
      }}
    >
      <div className="sm:w-[54px] sm:h-[54px] flex justify-start items-center ">
        {user.username ? (
          <Avatar
            avatarStyle={width < 640 ? "avatarMobile" : "avatarMain"}
            avatarURL={user.avatar_url}
          />
        ) : (
          <div>
            <CgProfile className="avatarMobile sm:w-[54px] sm:h-[54px] border-none text-primary" />
          </div>
        )}
      </div>

      <p className="mr-auto ml-3 text-[13px] sm:text-[16px] text-primary font-semibold ">
        Post a comment...
      </p>

      <Button buttonStyle="buttonMobile">Post</Button>
    </div>
  );
};

export default CommentPostContainer;
