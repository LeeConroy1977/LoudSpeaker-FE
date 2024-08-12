import React, { useContext, useEffect, useRef, useState } from "react";
import Avatar from "../reuseable-components/Avatar";
import { timeSince } from "../../utilities/time";
import VotesContainer from "../reuseable-components/VotesContainer";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { ExistingUserContext } from "../contexts/ExistingUsersContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { UserContext } from "../contexts/UserContext";
import { ArticleCommentsContext } from "../contexts/ArticleCommentsContext";
import { patchComment } from "../../utilities/api/commentsApi";

const ArticleCommentsCard = ({ comment, setDeletedCommentId }) => {
  const { body, created_at, author, votes, comment_id } = comment;
  const { width } = useContext(ScreenSizeContext);
  const { existingUsers } = useContext(ExistingUserContext);
  const { user } = useContext(UserContext);
  const [commentId, setCommentId] = useState(null);
  const { setComments } = useContext(ArticleCommentsContext);
  const [voteCount, setVoteCount] = useState(votes);
  const [incVotes, setIncVotes] = useState(0);

  const isFirst = useRef(true);

  console.log(commentId);
  useEffect(() => {
    if (!isFirst.current) {
      patchComment(comment_id, incVotes)
        .then((comment) => {
          setVoteCount(comment.votes);
        })
        .catch(() => {
          setVoteCount(voteCount - incVotes);
        });
    }
  }, [incVotes]);

  useEffect(() => {
    isFirst.current = false;
  }, []);

  useEffect(() => {
    setVoteCount(comment.votes);
  }, []);

  const handleVoteCount = (change) => {
    setIncVotes(change);
    setVoteCount(voteCount + change);
  };

  let userAvatar;

  existingUsers.map((user) => {
    if (user.username === author) {
      user = user;
      return (userAvatar = user.avatar_url);
    }
  });

  const timeDetail = timeSince(created_at);
  const userDetail = `${author} . ${timeDetail}`;

  function handleCommentId(id) {
    if (Number(id) === comment_id) {
      setCommentId(id);
    }
  }

  function handleDeleteCommentClick(id) {
    if (Number(id) === comment_id) {
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
          initialVotes={voteCount}
          handleClick={handleVoteCount}
          handleId={() => handleCommentId(comment.comment_id)}
          handleShouldSignIn={true}
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
