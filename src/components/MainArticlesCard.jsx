import React, { useContext } from "react";
import CommentsContainer from "./CommentsContainer";
import Avatar from "../reuseable-components/Avatar";
import VotesContainer from "./VotesContainer";
import { timeSince } from "../../utilities/time.js";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext.jsx";
import { Link } from "react-router-dom";

const MainArticlesCard = ({ article, users }) => {
  const { width, height } = useContext(ScreenSizeContext);

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

  console.log(article);

  users.forEach((user) => {
    if (user.username === author) {
      return (userAvatar = user.avatar_url);
    }
  });

  const timeDetail = timeSince(created_at);
  const userDetail = `${author} . ${timeDetail}`;

  return (
    <Link to={`/articles/${article_id}`}>
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
            <Avatar avatarStyle="avatarMain" avatarURL={userAvatar} />
          )}

          <p className="text-[10px] text-primary font-bold ml-3">
            {userDetail}
          </p>
          <div className="flex justify-end ml-auto w-[100px]">
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
              initialVotes={votes}
              handleShouldSignIn={false}
            />
          </div>
        </div>
        <h3 className=" font-bold text-[0.9rem] mt-2 sm:mt-1 sm:ml-[62px] sm:pb-1">
          {title}
        </h3>
        <img
          src={article_img_url}
          alt=""
          className="w-full h-[200px] sm:w-[90%] sm:h-[330px] mt-1 mb-1 sm:ml-auto rounded-xl cursor-pointer"
        />
      </div>
    </Link>
  );
};

export default MainArticlesCard;
