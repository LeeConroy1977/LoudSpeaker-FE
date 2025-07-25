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
      <div className="w-full border-b border-gray-200 dark:border-primary p-3 cursor-pointer flex">
        {width > 900 && (
          <div className="flex items-start justify-center mt-1 ml-0 w-20">
            {userAvatar && width < 900 && (
              <Avatar
                avatarStyle="avatarMobile"
                avatarStyleDesktop="avatarMain"
                avatarURL={userAvatar}
              />
            )}
            {userAvatar && width > 900 && (
              <Avatar
                avatarStyle={
                  width < 900
                    ? "avatarMobile"
                    : width < 1920
                    ? "avatarComposeTablet"
                    : "avatarComposeMain"
                }
                avatarURL={userAvatar}
              />
            )}
          </div>
        )}

        <div className="flex flex-col  w-full tablet:pr-2 ">
          <div className="flex items-center mt-2">
            {width < 900 && (
              <Avatar
                avatarStyle="avatarMobile"
                avatarStyleDesktop="avatarMain"
                avatarURL={userAvatar}
              />
            )}
            <div className="">
              <UserDetail
                createdAt={created_at}
                username={author}
                name={name}
              />
            </div>
            <div className="flex justify-end ml-auto gap-2 desktop:gap-3  ">
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
          <h3 className="font-bold text-[0.85rem] tablet-portrait:text-[1rem] tablet:text-[0.9rem] desktop:text-[1.1rem] xl-screen:text-[1.2rem]  text-gray-950 dark:text-darkTextPrimary ml-1 tablet:ml-3  mt-3 tablet:mt-2  desktop:mt-3 xl-screen:mt-4   tablet:mr-0 tablet:pb-1">
            {title}
          </h3>
          {!article_img_url ? (
            <LoadingSpinner />
          ) : (
            <img
              src={article_img_url}
              alt=""
              className="w-full h-[200px] tablet-portrait:h-[320px] tablet:w-[100%] tablet:h-[280px] desktop:h-[360px] xl-screen:h-[390px] pr-1 ml-1 tablet:mr-0 mt-2 tablet:mt-2 desktop:mt-3  mb-1 tablet:ml-3  rounded-xl cursor-pointer"
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default MainArticlesCard;
