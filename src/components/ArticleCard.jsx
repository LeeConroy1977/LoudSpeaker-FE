import React, { useContext } from "react";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import Avatar from "../reuseable-components/Avatar";
import CommentsContainer from "./CommentsContainer";
import VotesContainer from "./VotesContainer";
import { timeSince } from "../../utilities/time";
import CommentPostContainer from "./CommentPostContainer";
import ArticleCommentsList from "./ArticleCommentsList";
import { ExistingUserContext } from "../contexts/ExistingUsersContext";

const ArticleCard = ({ article, comments, handlePostCommentContainerOpen }) => {
  const { width, height } = useContext(ScreenSizeContext);
  const { existingUsers } = useContext(ExistingUserContext);
  const {
    title,
    body,
    author,
    created_at,
    votes,
    article_img_url,
    comment_count,
  } = article;

  let userAvatar;

  existingUsers.map((user) => {
    if (user.username === author) {
      user = user;
      return (userAvatar = user.avatar_url);
    }
  });

  const timeDetail = timeSince(created_at);
  const userDetail = `${author} . ${timeDetail}`;

  return (
    <div>
      {article && comments && (
        <>
          {" "}
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

              <p className="text-[10px] text-primary font-bold ml-3">
                {userDetail}
              </p>
              <div className="flex justify-end ml-auto w-[100px]">
                <CommentsContainer
                  commentStyle="mobileComments"
                  commentsNumStyle="mobileCommentsNum"
                  commentsIconStyle="mobileCommentsIcon"
                  comment_count={comment_count}
                />
                <VotesContainer
                  votesStyle="mobileVotes"
                  votesNumStyle="mobileVotesNum"
                  votesIconStyle="mobileVotesIcon"
                  votes={votes}
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
          <CommentPostContainer
            handlePostCommentContainerOpen={handlePostCommentContainerOpen}
          />
          {/* change from user to article id and pass article as props instead!! */}
          <ArticleCommentsList article={article} comments={comments} />{" "}
        </>
      )}
    </div>
  );
};

export default ArticleCard;
