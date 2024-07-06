import React, { useContext } from "react";
import users from "../../data/users";
import Avatar from "../reuseable-components/Avatar";
import { timeSince } from "../../utilities/time";
import CommentsContainer from "./CommentsContainer";
import VotesContainer from "./VotesContainer";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";

const ArticleCommentsCard = ({ comment, author }) => {
  const { body, created_at, votes } = comment;
  const { width, height } = useContext(ScreenSizeContext);

  let userAvatar;

  users.map((user) => {
    if (user.username === author) {
      user = user;
      return (userAvatar = user.avatar_url);
    }
  });

  const timeDetail = timeSince(created_at);
  const userDetail = `${author} . ${timeDetail}`;

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
          votes={votes}
        />
      </div>
      <div className="sm:ml-[4rem] sm:mr-1 ml-2 mr-2 mb-1 mt-3 sm:mt-3  text-[0.75rem]  sm:text-[0.8rem] font-semibold">
        {body}
      </div>
    </div>
  );
};

export default ArticleCommentsCard;
