import React, { useContext, useEffect, useRef, useState } from "react";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import Avatar from "../reuseable-components/Avatar";
import CommentsContainer from "./CommentsContainer";
import VotesContainer from "../reuseable-components/VotesContainer";
import { timeSince } from "../../utilities/time";
import CommentPostContainer from "./CommentPostContainer";
import ArticleCommentsList from "./ArticleCommentsList";
import { ExistingUserContext } from "../contexts/ExistingUsersContext";
import { MainArticleContext } from "../contexts/MainArticleContext";

import {
  deleteArticleComment,
  postArticleComment,
} from "../../utilities/api/commentsApi";
import { UserContext } from "../contexts/UserContext";
import { ArticleCommentsContext } from "../contexts/ArticleCommentsContext";
import UserDetail from "../reuseable-components/UserDetail";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { SearchOpenContext } from "../contexts/SearchOpenContext";

const ArticleCard = ({
  handleVoteCount,
  voteCount,
  commentCount,
  setCommentCount,
}) => {
  const { width } = useContext(ScreenSizeContext);
  const { existingUsers } = useContext(ExistingUserContext);
  const { comments, setComments } = useContext(ArticleCommentsContext);
  const { user } = useContext(UserContext);
  const { isSearchOpen } = useContext(SearchOpenContext);
  const [deletedCommentId, setDeletedCommentId] = useState(null);
  const { article } = useContext(MainArticleContext);
  const [userComment, setUserComment] = useState({
    body: "",
  });
  const { title, body, author, created_at, article_img_url, article_id } =
    article;
  const { body: commentBody } = userComment;

  const isFirstDelete = useRef(true);
  const isFirstPost = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isFirstDelete.current) {
      deleteArticleComment(deletedCommentId).then(() => {});
      setCommentCount((count) => count - 1);
    }
  }, [deletedCommentId]);

  useEffect(() => {
    if (!isFirstPost.current) {
      postArticleComment(article_id, commentBody, user.username).then(
        (comment) => {
          console.log(comment);
          setComments([comment, ...comments]);
          setCommentCount((count) => count + 1);
        }
      );
    }
  }, [userComment]);

  useEffect(() => {
    isFirstDelete.current = false;
    isFirstPost.current = false;
  }, []);

  let userAvatar;
  let name;

  existingUsers.map((user) => {
    if (user.username === author) {
      name = user.name;
      return (userAvatar = user.avatar_url);
    }
  });

  return (
    <div
      className={` ${
        isSearchOpen && width < 640 ? "bg-black bg-opacity-50" : null
      }`}
    >
      <div
        className="flex items-center mt-4 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <IoArrowBack className="cursor-pointer ml-4 text-primary font-bold" />
        <p className="ml-4 text-[12px] text-primary font-bold">
          Back to articles...
        </p>
      </div>
      {article !== undefined && voteCount !== undefined && (
        <div>
          <div className="w-full border-b border-gray-200 p-3 cursor-pointer">
            <div className="flex items-center mt-1 ml-1">
              {userAvatar && width < 640 && (
                <Avatar
                  avatarStyle="avatarMobile"
                  avatarStyleDesktop="avatarMain"
                  avatarURL={userAvatar}
                />
              )}
              {userAvatar && width > 640 && (
                <Avatar avatarStyle="avatarMain " avatarURL={userAvatar} />
              )}

              <UserDetail
                createdAt={created_at}
                username={author}
                name={name}
              />
              <div className="flex justify-end ml-auto w-[100px]">
                <CommentsContainer
                  commentStyle="mobileComments"
                  commentsNumStyle="mobileCommentsNum"
                  commentsIconStyle="mobileCommentsIcon"
                  commentCount={commentCount}
                />

                <VotesContainer
                  votesStyle="mobileVotes"
                  votesNumStyle="mobileVotesNum"
                  votesIconStyle="mobileVotesIcon"
                  initialVotes={voteCount}
                  handleClick={handleVoteCount}
                  article={article}
                  handleShouldSignIn={true}
                />
              </div>
            </div>
            <h3 className=" font-bold text-[0.9rem] mt-3 sm:mt-1  sm:pb-1">
              {title}
            </h3>
            <img
              src={article_img_url}
              alt=""
              className="w-full h-[200px] sm:w-[100%] sm:h-[330px] mt-2 mb-1 sm:ml-auto rounded-xl cursor-pointer"
            />
            <p className=" sm:mr-1 ml-1 mt-3 sm:mt-3  text-[0.825rem]  sm:text-[0.9rem] font-semibold">
              {body}
            </p>
          </div>
          <CommentPostContainer setUserComment={setUserComment} />
          <ArticleCommentsList
            article={article}
            setDeletedCommentId={setDeletedCommentId}
          />{" "}
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
