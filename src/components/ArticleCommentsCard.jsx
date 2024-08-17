import React, { useContext, useEffect, useRef, useState } from "react";
import Avatar from "../reuseable-components/Avatar";
import VotesContainer from "../reuseable-components/VotesContainer";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { ExistingUserContext } from "../contexts/ExistingUsersContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { UserContext } from "../contexts/UserContext";
import { ArticleCommentsContext } from "../contexts/ArticleCommentsContext";
import { patchComment } from "../../utilities/api/commentsApi";
import UserDetail from "../reuseable-components/UserDetail";
import { DeletedCommentIdContext } from "../contexts/DeletedCommentIdContext";

const ArticleCommentsCard = ({ comment }) => {
  const { body, created_at, author, votes, comment_id } = comment;
  const { width } = useContext(ScreenSizeContext);
  const { existingUsers } = useContext(ExistingUserContext);
  const { user } = useContext(UserContext);
  const { comments, setComments } = useContext(ArticleCommentsContext);
  const { setDeletedCommentId } = useContext(DeletedCommentIdContext);
  const [commentId, setCommentId] = useState(null);
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
  let name;

  existingUsers.map((user) => {
    if (user.username === author) {
      name = user.name;
      user = user;
      return (userAvatar = user.avatar_url);
    }
  });

  function handleCommentId(id) {
    if (Number(id) === comment_id) {
      setCommentId(id);
    }
  }

  function handleDeleteCommentClick(id) {
    setDeletedCommentId(id);
    const filteredComments = comments.filter(
      (comment) => comment.comment_id !== Number(id)
    );

    setComments([...filteredComments]);
  }

  return (
    <div className="w-full h-auto border-gray-200 border-b p-2 ">
      <div className="flex justify-start items-center ml-2 mr-2 mt-1">
        <Avatar
          avatarStyle={width < 640 ? "avatarMobileComment" : "avatarComment"}
          avatarURL={userAvatar}
        />
        <UserDetail createdAt={created_at} username={author} name={name} />
        <div className="ml-auto">
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
      </div>
      <div className="sm:ml-[4rem] sm:mr-2 ml-3 mr-3 mb-1 mt-3 sm:mt-1  text-[0.75rem]  sm:text-[13px] font-600">
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
