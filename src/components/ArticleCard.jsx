import React, { useContext, useEffect } from "react";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import Avatar from "../reuseable-components/Avatar";
import CommentsContainer from "./CommentsContainer";
import VotesContainer from "../reuseable-components/VotesContainer";
import CommentPostContainer from "./CommentPostContainer";
import ArticleCommentsList from "./ArticleCommentsList";
import { ExistingUserContext } from "../contexts/ExistingUsersContext";
import { MainArticleContext } from "../contexts/MainArticleContext";
import { UserContext } from "../contexts/UserContext";
import UserDetail from "../reuseable-components/UserDetail";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import { VoteCountContext } from "../contexts/VoteCountContext";
import { CommentCountContext } from "../contexts/commentCountContext";
import { useApi } from "../contexts/ApiContext";
import { DeletedCommentIdContext } from "../contexts/DeletedCommentIdContext";
import { UserCommentContext } from "../contexts/UserCommentContext";

const ArticleCard = ({ handleVoteCount }) => {
  const { width } = useContext(ScreenSizeContext);
  const { existingUsers } = useContext(ExistingUserContext);
  const { commentCount } = useContext(CommentCountContext);
  const { user } = useContext(UserContext);
  const { isSearchOpen } = useContext(SearchOpenContext);
  const { deletedCommentId } = useContext(DeletedCommentIdContext);
  const { article } = useContext(MainArticleContext);
  const { voteCount } = useContext(VoteCountContext);
  const { deleteComment, createArticleComment } = useApi();
  const { userComment } = useContext(UserCommentContext);
  const {
    title,
    body,
    author,
    created_at,
    article_img_url,
    article_id,
    comment_count,
  } = article;
  const { body: commentBody } = userComment;
  const navigate = useNavigate();

  useEffect(() => {
    deleteComment(deletedCommentId);
  }, [deletedCommentId]);

  useEffect(() => {
    if (userComment.body) {
      createArticleComment(article_id, commentBody, user.username);
    }
  }, [userComment]);

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
              <div className="flex justify-end ml-auto w-[100px] mr-1">
                <CommentsContainer
                  commentStyle="mobileComments"
                  commentsNumStyle="mobileCommentsNum"
                  commentsIconStyle="mobileCommentsIcon"
                  commentCount={comment_count}
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
            <h3 className=" font-semibold text-[0.9rem] ml-1 sm:ml-1 mt-3 sm:mt-3  sm:pb-1 font-sans">
              {title}
            </h3>
            <img
              src={article_img_url}
              alt=""
              className="w-full h-[200px] sm:w-[100%] sm:h-[330px] mt-1 mb-1 ml-1 sm:ml:2 pr-2 sm:pr:0  rounded-xl cursor-pointer"
            />
            <p className=" sm:mr-1 ml-1 sm:ml-1 mr-1  mt-3 sm:mt-3 text-gray-950  text-[0.825rem]  sm:text-[0.9rem] font-500">
              {body}
            </p>
          </div>
          <CommentPostContainer />
          <ArticleCommentsList />
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
