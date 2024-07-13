import React, { useContext } from "react";
import Avatar from "../reuseable-components/Avatar";
import { timeSince } from "../../utilities/time";
import VotesContainer from "./VotesContainer";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { ExistingUserContext } from "../contexts/ExistingUsersContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { UserContext } from "../contexts/UserContext";
import { ArticleCommentsContext } from "../contexts/ArticleCommentsContext";

const ArticleCommentsCard = ({ comment, setDeletedCommentId }) => {
  const { body, created_at, votes, comment_id } = comment;
  const { width } = useContext(ScreenSizeContext);
  const { existingUsers } = useContext(ExistingUserContext);
  const { user } = useContext(UserContext);
  const { setComments } = useContext(ArticleCommentsContext);

  const { author } = comment;

  let userAvatar;

  existingUsers.map((user) => {
    if (user.username === author) {
      user = user;
      return (userAvatar = user.avatar_url);
    }
  });

  const timeDetail = timeSince(created_at);
  const userDetail = `${author} . ${timeDetail}`;

  function handleDeleteCommentClick(id) {
    if (Number(id) === comment_id) {
      console.log(Number(id), comment_id);
      console.log("this ran!!");
      setDeletedCommentId(id);
      setComments((comment) =>
        comment.filter((comment) => comment.comment_id !== Number(id))
      );
    }
  }

  return (
    <div className="w-full h-auto border-gray-200 border-b p-2 ">
      <div className="flex justify-between items-center ml-2 mr-2 mt-1">
        <Avatar
          avatarStyle={width < 640 ? "avatarMobile" : "avatarMain"}
          avatarURL={userAvatar}
        />
        <p className="text-[10px] text-primary font-bold ml-3 mr-auto">
          {userDetail}
        </p>
        <VotesContainer
          votesStyle="mobileVotes"
          votesNumStyle="mobileVotesNum"
          votesIconStyle="mobileVotesIcon"
          initialVotes={votes}
        />
      </div>
      <div className="sm:ml-[4rem] sm:mr-1 ml-2 mr-2 mb-1 mt-3 sm:mt-3  text-[0.75rem]  sm:text-[0.8rem] font-semibold">
        {body}
      </div>
      <div className="flex justify-end mr-2">
        {user.username === author && (
          <RiDeleteBin6Line
            className="text-primary cursor-pointer"
            onClick={() => handleDeleteCommentClick(comment.comment_id)}
          />
        )}
      </div>
    </div>
  );
};

export default ArticleCommentsCard;
