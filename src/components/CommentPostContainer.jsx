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
import { useParams } from "react-router-dom";
import { CommentsContext } from "../contexts/CommentsContext";

const CommentPostContainer = () => {
  const { width } = useContext(ScreenSizeContext);
  const { user } = useContext(UserContext);
  const { article_id } = useParams();
  const { isPostCommentOpen, setIsPostCommentOpen } = useContext(
    PostCommentOpenContext
  );
  const { commentsRef, handleScrollToTop } = useContext(CommentScrollContext);
  const {
    state: { totalComments },
    fetchArticleComments,
    CreateArticleComments,
    handleLikeComment,
    handleUnlikeComment,
  } = useContext(CommentsContext);
  const { showModal } = useModal();
  const { showPopup } = useContext(PopupContext); 
  const [commentBody, setCommentBody] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (article_id) {
      fetchArticleComments(article_id);
    }
  }, [article_id, fetchArticleComments]);

  useEffect(() => {
    handleIsDisabled();
  }, [user, isPostCommentOpen, commentBody]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!commentBody.trim()) {
      showPopup("Comment cannot be empty.");
      return;
    }

    if (!user?.username) {
      showPopup("You must be signed in to post a comment.");
      showModal(<SignIn />);
      return;
    }

    if (!article_id) {
      console.error("Article ID is missing.");
      showPopup("Failed to post comment: Invalid article ID.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await CreateArticleComments(
        article_id,
        commentBody,
        user.username
      );

      await fetchArticleComments(article_id);
      showPopup("Comment posted successfully!");

      setIsPostCommentOpen(false);
      handleScrollToTop();
    } catch (error) {
      console.error("Error posting comment:", error);
      showPopup(`Failed to post comment: ${error.message || "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
      setCommentBody("");
    }
  };

  function handleIsDisabled() {
    setIsDisabled(
      !user?.username ||
        !isPostCommentOpen ||
        !commentBody.trim() ||
        isSubmitting
    );
  }

  function handleContainerClick(e) {
    if (!user?.username) {
      showModal(<SignIn />);
      return;
    }
    setIsPostCommentOpen(true);
    handleScrollToTop();
    e.stopPropagation();
  }

  function handleCloseClick(e) {
    e.stopPropagation();
    setIsPostCommentOpen(false);
    setCommentBody("");
  }

  return (
    <div
      ref={commentsRef}
      className={`${
        isPostCommentOpen
          ? "flex items-start h-[9.9rem] sm:h-[12rem]"
          : "w-full h-[78px] sm:h-[80px] flex items-center"
      } justify-between p-4 border-gray-200 dark:border-primary border-b`}
      onClick={handleContainerClick}>
      {/* Avatar/Profile Icon */}
      <div className="sm:w-[54px] sm:h-[54px] flex justify-start items-center">
        {user?.username ? (
          <Avatar
            avatarStyle={width < 640 ? "avatarMobile" : "avatarMain"}
            avatarURL={user.avatar_url}
          />
        ) : (
          <CgProfile className="avatarMobile sm:w-[54px] sm:h-[54px] border-none text-primary cursor-pointer" />
        )}
      </div>

      {/* Form or prompt */}
      {isPostCommentOpen ? (
        <form
          className="sm:w-[70%] sm:h-[9rem] flex flex-col justify-between"
          onSubmit={handleCommentSubmit}>
          <textarea
            placeholder="Post a comment..."
            className="sm:w-[100%] sm:h-[7rem] text-[#333333] dark:text-darkTextPrimary sm:pt-[0.8rem] font-500 focus:outline-none border-none resize-none placeholder-primary text-[0.8rem] sm:text-[0.8rem] placeholder-10px sm:placeholder-13px placeholder:font-semibold mt-2 mr-12 sm:mt-1 dark:bg-darkBg"
            required
            name="comment"
            id="comment"
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            disabled={isSubmitting}
          />

          <div className="flex items-end justify-end mt-2">
            <Button
              type="submit"
              handleDisabled={isDisabled || isSubmitting}
              buttonStyle={
                isDisabled || isSubmitting
                  ? "buttonMobileDisabled dark:bg-secondaryBg dark:text-gray-400"
                  : "buttonMobile dark:bg-primary dark:text-darkTextPrimary"
              }>
              Post
            </Button>
          </div>
        </form>
      ) : (
        <p className="mr-auto ml-6 text-[13px] sm:text-[16px] text-primary font-semibold">
          Post a comment...
        </p>
      )}

      {/* Close icon */}
      <div
        className={`flex flex-col ${
          !isPostCommentOpen
            ? "justify-center items-center"
            : "items-end justify-between"
        } h-full`}>
        {isPostCommentOpen && (
          <div onClick={handleCloseClick}>
            <IoIosCloseCircleOutline className="text-primary text-[28px] font-bold cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentPostContainer;
