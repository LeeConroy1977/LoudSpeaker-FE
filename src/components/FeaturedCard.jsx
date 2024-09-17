import React, { useContext } from "react";
import Avatar from "../reuseable-components/Avatar";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import VotesContainer from "../reuseable-components/VotesContainer";
import CommentsContainer from "../reuseable-components/CommentsContainer";
import { ExistingUserContext } from "../contexts/ExistingUsersContext";
import { Link } from "react-router-dom";
import { SearchOpenContext } from "../contexts/SearchOpenContext";

const FeaturedCard = ({ article }) => {
  const { width } = useContext(ScreenSizeContext);
  const { title, article_img_url, author, votes, comment_count } = article;
  const { existingUsers } = useContext(ExistingUserContext);
  const { isSearchOpen } = useContext(SearchOpenContext);
  const user = existingUsers.find((user) => user.username === author);
  const userAvatar = user ? user.avatar_url : null;
  const name = user ? user.name : "";
  const reducedTitle = title.split(" ").slice(0, 6).join(" ");

  return (
    <Link to={`/articles/${article.article_id}`}>
      {userAvatar && article && (
        <div className="h-full w-[150px] sm:w-full sm:h-[138px] relative ">
          {isSearchOpen && width < 640 ? null : (
            <>
              <div className="absolute inset-0 bg-black bg-opacity-25 flex flex-col justify-center items-center text-center p-4 rounded-lg"></div>

              <img
                className="h-full w-full rounded-lg"
                src={article_img_url}
                alt=""
              />
              <h4 className="absolute top-16 sm:top-20 left-0 px-2 text-gray-200 dark:text-darkTextPrimary text-[9.5px] sm:text-[12px] sm:font-bold">
                {reducedTitle}...
              </h4>
            </>
          )}
          {width > 640 && (
            <>
              <div className="w-full h-[38px] items-center flex absolute top-[98px] pl-2">
                {userAvatar && article && (
                  <Avatar avatarStyle="avatarFeatured" avatarURL={userAvatar} />
                )}

                <div className="flex-col justify-between items-center pl-3  w-full">
                  <p className="text-gray-200 dark:text-darkTextPrimary text-[8px]  mb-[1px] font-semibold">
                    {name}.@{author}
                  </p>
                  <div className="w-full h-full flex ml-[0px] ">
                    <CommentsContainer
                      commentStyle="featuredComment"
                      commentsNumStyle="featuredCommentsNum"
                      commentsIconStyle="featuredCommentsIcon"
                      comments="1234"
                      commentCount={comment_count}
                    />
                    <VotesContainer
                      votesStyle="featuredVotes"
                      votesNumStyle="featuredVotesNum"
                      votesIconStyle="featuredVotesIcon"
                      initialVotes={votes}
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
