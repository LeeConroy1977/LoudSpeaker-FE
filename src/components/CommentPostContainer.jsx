import React, { useContext, useEffect, useState } from "react";
import Avatar from "../reuseable-components/Avatar";
import Button from "../reuseable-components/Button";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { PostCommentOpenContext } from "../contexts/PostCommentOpenContext";
import { CgProfile } from "react-icons/cg";
import { UserContext } from "../contexts/UserContext";
import { useModal } from "../contexts/ModalContext";
import SignIn from "./SignIn";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { PopupContext } from "../contexts/PopupContext";
import { CommentScrollContext } from "../contexts/CommentScrollContext";
import { CommentCountContext } from "../contexts/commentCountContext";
import { ArticleCommentsContext } from "../contexts/ArticleCommentsContext";

import { useParams } from "react-router-dom";
import { postArticleComment } from "../../utilities/api/commentsApi";

const CommentPostContainer = () => {
  const { width } = useContext(ScreenSizeContext);
  const { user } = useContext(UserContext);
  const { article_id } = useParams();
  const { isPostCommentOpen, setIsPostCommentOpen } = useContext(
    PostCommentOpenContext
  );
  const { commentsRef, handleScrollToTop } = useContext(CommentScrollContext);
  const { setCommentCount } = useContext(CommentCountContext);
  const { setComments } = useContext(ArticleCommentsContext);
  const { showModal } = useModal();
  const [commentBody, setCommentBody] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const showPopup = useContext(PopupContext);

  useEffect(() => {
    handleIsDisabled();
  }, [user, isPostCommentOpen, commentBody]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentBody.trim().length === 0) return;

    try {
      const newComment = await postArticleComment(
        article_id,
        commentBody,
        user.username
      );
      setComments((prevComments) => [newComment, ...prevComments]);
      setCommentCount((prev) => prev + 1);
      showPopup("Comment posted successfully!");
      setCommentBody("");
      setIsPostCommentOpen(false);
    } catch (error) {
      console.error("Error posting comment:", error);
      showPopup("Failed to post comment.");
    }
  };

  function handlePostCommentOpen() {
    if (!user.username) {
      showModal(<SignIn />);
    }
    if (user.username) {
      setIsPostCommentOpen(true);
    }
  }

  function handleIsDisabled() {
    if (user.username && isPostCommentOpen && !commentBody) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }

  function handleContainerClick(e) {
    if (!user.username) {
      showModal(<SignIn />);
    }
    handlePostCommentOpen();
    e.stopPropagation();
  }

  function handleCloseClick(e) {
    e.stopPropagation();
    setIsPostCommentOpen(false);
  }

  return (
    <div
      ref={commentsRef}
      className={`${
        isPostCommentOpen
          ? "flex items-start h-[9.9rem] sm:h-[12rem]"
          : " w-full h-[78px]  sm:h-[80px] flex items-center"
      }   justify-between p-4 border-gray-200 dark:border-primary border-b`}
      onClick={() => {
        handleContainerClick();
        handleScrollToTop();
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
            <CgProfile className="avatarMobile sm:w-[54px] sm:h-[54px] border-none text-primary cursor-pointer" />
          </div>
        )}
      </div>
      {isPostCommentOpen ? (
        <form className="sm:w-[70%] sm:h-[9rem]">
          <textarea
            placeholder="Post a comment..."
            className="sm:w-[100%] sm:h-[9rem] text-[#333333] dark:text-darkTextPrimary sm:pt-[0.8rem]  font-500 focus:outline-none border-none resize-none placeholder-primary text-[0.8rem] sm:text-[0.8rem] placeholder-10px sm:placeholder-13px placeholder:font-semibold mt-2 mr-12 sm:mt-1 dark:bg-darkBg"
            required
            name="comment"
            id="comment"
            method="POST"
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
          />
        </form>
      ) : (
        <p className="mr-auto ml-6 text-[13px] sm:text-[16px] text-primary font-semibold ">
          Post a comment...
        </p>
      )}

      <div
        className={`flex flex-col ${
          !isPostCommentOpen
            ? "justify-center items-center "
            : "items-end justify-between "
        }   h-full`}
      >
        {isPostCommentOpen && (
          <div onClick={handleCloseClick}>
            <IoIosCloseCircleOutline className="text-primary text-[28px] font-bold cursor-pointer" />
          </div>
        )}
        <Button
          handleDisabled={isDisabled}
          buttonStyle={
            isDisabled
              ? "buttonMobileDisabled dark:bg-secondaryBg dark:text-gray-400"
              : "buttonMobile dark:bg-primary dark:text-darkTextPrimary"
          }
          handleClick={(e) => {
            handleCommentSubmit(e);
            handleCloseClick(e);
            handleScrollToTop();
          }}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default CommentPostContainer;
