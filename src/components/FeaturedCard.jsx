import React, { useContext } from "react";
import Avatar from "../reuseable-components/Avatar";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import VotesContainer from "./VotesContainer";
import CommentsContainer from "./CommentsContainer";
import { ExistingUserContext } from "../contexts/ExistingUsersContext";
import { Link } from "react-router-dom";

const FeaturedCard = ({ article, handleSelectedArticle, isSearchOpen }) => {
  const { width, height } = useContext(ScreenSizeContext);
  const { title, article_img_url, author, votes } = article;
  const { existingUsers } = useContext(ExistingUserContext);

  const userAvatar = existingUsers.map((user) => {
    if (user.username === author) {
      return user.avatar_url;
    }
  });

  const reducedTitle = title.split(" ").slice(0, 4).join(" ");

  return (
    <Link to={`/articles/${article.article_id}`}>
      {userAvatar && article && (
        <div className="h-full w-[140px] sm:w-full sm:h-[138px] relative ">
          {!isSearchOpen && (
            <>
              <div className="absolute inset-0 bg-black bg-opacity-10 flex flex-col justify-center items-center text-center p-4 rounded-lg"></div>
              <img
                className="h-full w-full rounded-lg"
                src={article_img_url}
                alt=""
              />
              <h4 className="absolute top-16 sm:top-20 left-0 px-2 text-white text-[11px] sm:text-[13px] sm:font-bold">
                {reducedTitle}...
              </h4>
            </>
          )}

          {width > 640 && (
            <>
              <div className="w-full h-[38px] items-center flex absolute top-[98px] pl-2">
                {userAvatar && article && userAvatar && (
                  <Avatar avatarStyle="avatarFeatured" avatarURL={userAvatar} />
                )}

                <div className="flex-col justify-between items-center pl-3  w-full">
                  <p className="text-white text-[8.5px]  mb-[1px] font-bold">
                    {author}
                  </p>
                  <div className="w-full h-full flex ">
                    <CommentsContainer
                      commentStyle="featuredComment"
                      commentsNumStyle="featuredCommentsNum"
                      commentsIconStyle="featuredCommentsIcon"
                      comments="1234"
                    />
                    <VotesContainer
                      votesStyle="featuredVotes"
                      votesNumStyle="featuredVotesNum"
                      votesIconStyle="featuredVotesIcon"
                      votes={votes}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </Link>
  );
};

export default FeaturedCard;
