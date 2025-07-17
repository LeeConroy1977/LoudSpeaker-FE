import React, { useContext } from "react";
import CommentsContainer from "../reuseable-components/CommentsContainer.jsx";
import Avatar from "../reuseable-components/Avatar";
import VotesContainer from "../reuseable-components/VotesContainer.jsx";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext.jsx";
import { Link } from "react-router-dom";
import UserDetail from "../reuseable-components/UserDetail.jsx";
import LoadingSpinner from "../reuseable-components/LoadingSpinner";
import { ArticlesContext } from "../contexts/ArticlesContext";

const MainArticlesCard = ({ article, users }) => {
  const { width } = useContext(ScreenSizeContext);
  const {
    state: { articles, selectedArticle, totalArticles, loading, error },
    handleUnlikeArticle,
    handleLikeArticle,
  } = useContext(ArticlesContext);
  const {
    title,
    author,
    created_at,
    votes,
    article_img_url,
    comment_count,
    article_id,
  } = article;
  let userAvatar;
  let name;

  users.forEach((user) => {
    if (user.username === author) {
      name = user.name;
      userAvatar = user.avatar_url;
    }
  });

  const handleVoteChange = async (voteChange) => {
    console.log("handleVoteChange called with:", { article_id, voteChange });
    try {
      const response =
        voteChange > 0
          ? await handleLikeArticle(article_id, voteChange)
          : await handleUnlikeArticle(article_id, voteChange);
      console.log("handleVoteChange response:", response);
      return response; 
    } catch (error) {
      console.error("Error updating article votes:", error);
      throw error;
    }
  };


  return (
    <Link to={`/articles/${article_id}`}>
      <div className="w-full border-b border-gray-200 dark:border-primary p-3 cursor-pointer">
        <div className="flex items-center mt-1 ml-0">
          {userAvatar && width < 640 && (
            <Avatar
              avatarStyle="avatarMobile"
              avatarStyleDesktop="avatarMain"
              avatarURL={userAvatar}
            />
          )}
          {userAvatar && width > 640 && (
            <Avatar avatarStyle="avatarMain" avatarURL={userAvatar} />
          )}
          <UserDetail createdAt={created_at} username={author} name={name} />
          <div className="flex justify-end ml-auto w-[100px] mr-1">
            <CommentsContainer
              commentStyle="mobileComments dark:bg-secondaryBg"
              commentsNumStyle="mobileCommentsNum dark:text-darkTextPrimary"
              commentsIconStyle="mobileCommentsIcon dark:text-darkTextPrimary"
              commentCount={comment_count}
            />
            <div className="ml-auto">
              <VotesContainer
                votesStyle="mobileVotes dark:bg-secondaryBg"
                votesNumStyle="mobileVotesNum dark:text-darkTextPrimary"
                votesIconStyle="mobileVotesIcon"
                initialVotes={votes}
                handleClick={handleVoteChange}
                entity_id={article_id}
                handleShouldSignIn={true}
              />
            </div>
          </div>
        </div>
        <h3 className="font-bold text-[0.85rem] sm:text-[0.9rem] text-gray-950 dark:text-darkTextPrimary ml-1 mt-3 sm:mt-0 sm:ml-[62px] sm:mr-0 sm:pb-1">
          {title}
        </h3>
        {!article_img_url ? (
          <LoadingSpinner />
        ) : (
          <img
            src={article_img_url}
            alt=""
            className="w-full h-[200px] sm:w-[90%] sm:h-[330px] pr-1 ml-1 sm:mr-0 mt-2 sm:mt-1 mb-1 sm:ml-auto rounded-xl cursor-pointer"
          />
        )}
      </div>
    </Link>
  );
};

export default MainArticlesCard;
