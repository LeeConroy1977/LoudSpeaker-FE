import { useContext, useEffect, useRef } from "react";
import Avatar from "../reuseable-components/Avatar";
import VotesContainer from "../reuseable-components/VotesContainer";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { ExistingUserContext } from "../contexts/ExistingUsersContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { UserContext } from "../contexts/UserContext";
import { CommentsContext } from "../contexts/CommentsContext";
import UserDetail from "../reuseable-components/UserDetail";

const ArticleCommentsCard = ({ comment, article_id }) => {
  const { width } = useContext(ScreenSizeContext);
  const {
    state: { comments },
    handleRemoveComment,
    handleLikeComment,
    handleUnlikeComment,
  } = useContext(CommentsContext);
  const { existingUsers } = useContext(ExistingUserContext);
  const { user } = useContext(UserContext);

  if (!comment) {
    console.warn("Comment prop is null or undefined");
    return null;
  }

  const { body, created_at, username, votes, id } = comment;
  const isFirst = useRef(true);

  useEffect(() => {
    
    isFirst.current = false;
  }, [comment, article_id]);

  const handleVoteChange = async (voteChange) => {
    try {
      const response =
        voteChange > 0
          ? await handleLikeComment(id, voteChange)
          : await handleUnlikeComment(id, voteChange);
      return response; 
    } catch (error) {
      console.error("Error updating comment votes:", error);
      throw error;
    }
  };

  async function handleDeleteCommentClick(commentId) {
    if (!commentId) {
      console.error("Comment ID is undefined");
      alert("Cannot delete comment: Invalid comment ID");
      return;
    }
    try {
      await handleRemoveComment(commentId);
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment. Please try again.");
    }
  }

  const userObj = existingUsers?.find((user) => user?.username === username);
  const userAvatar = userObj ? userObj?.avatar_url : null;
  const name = userObj ? userObj?.name : "";

  return (
    <div className="w-full h-auto border-gray-200 dark:border-primary border-b p-2">
      <div className="flex justify-start items-center ml-2 mr-2 mt-1">
        <Avatar
          avatarStyle={width < 640 ? "avatarMobileComment" : "avatarComment"}
          avatarURL={userAvatar}
        />
        <UserDetail createdAt={created_at} username={username} name={name} />
        <div className="ml-auto">
          <VotesContainer
            votesStyle="mobileVotes dark:bg-secondaryBg"
            votesNumStyle="mobileVotesNum dark:text-darkTextPrimary"
            votesIconStyle="mobileVotesIcon"
            initialVotes={votes}
            handleClick={handleVoteChange}
            entity_id={id}
            handleShouldSignIn={true}
          />
        </div>
      </div>
      <div className="sm:ml-[4rem] sm:mr-2 ml-3 mr-3 mb-1 mt-3 sm:mt-1 text-[0.75rem] sm:text-[13px] font-600 text-gray-950 dark:text-darkTextPrimary">
        {body}
      </div>
      <div className="flex justify-end mr-2">
        {user.username === username && (
          <RiDeleteBin6Line
            className="text-primary cursor-pointer"
            onClick={() => handleDeleteCommentClick(id)}
          />
        )}
      </div>
    </div>
  );
};

export default ArticleCommentsCard;
