import React, { useContext } from "react";
import Avatar from "../reuseable-components/Avatar";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { ExistingUserContext } from "../contexts/ExistingUsersContext";
import { Link } from "react-router-dom";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import LoadingSpinner from "../reuseable-components/LoadingSpinner";

const FeaturedCard = ({ article }) => {
  const { width } = useContext(ScreenSizeContext);
  const { title, article_img_url, author} = article;
  const { existingUsers } = useContext(ExistingUserContext);

  const user = existingUsers.find((user) => user.username === author);
  const userAvatar = user ? user.avatar_url : null;
  const name = user ? user.name : "";
  const reducedTitle = title.split(" ").slice(0, 5).join(" ");

  return (
    <Link to={`/articles/${article.article_id}`}>
      {userAvatar && article && (
        <div className="h-[110px] w-[160px] tablet-portrait:h-[140px]  tablet-portrait:w-[230px]   tablet:w-full tablet:h-[140px] xl-screen:h-[175px] relative tablet:mb-1 ">
          <>
            <div className="absolute  inset-0 bg-black bg-opacity-25 flex flex-col justify-center items-center text-center p-4 rounded-lg"></div>
            {!article_img_url ? (
              <LoadingSpinner />
            ) : (
              <img
                className="h-full w-full rounded-lg"
                src={article_img_url}
                alt=""
              />
            )}

            <h4 className="absolute top-16 tablet-portrait:top-24 tablet:top-20 xl-screen:top-24 left-0 pl-2 tablet-portrait:pl-4 text-gray-200 dark:text-darkTextPrimary text-[10px] font-bold tablet-portrait:text-[10.5px] desktop:text-[12px] xl-screen:text-[14px] tablet:font-bold">
              {reducedTitle}...
            </h4>
          </>

          {width > 800 && (
            <>
              <div className="w-full h-[38px] items-center flex absolute top-[6rem] xl-screen:top-[7.5rem] pl-2 tablet:pl-4">
                {userAvatar && article && (
                  <Avatar
                    avatarStyle={
                      width > 1919 ? "avatarFeaturedLarge" : "avatarFeatured"
                    }
                    avatarURL={userAvatar}
                  />
                )}

                <div className="flex-col justify-between items-center pl-3  w-full">
                  <p className="text-gray-200 dark:text-darkTextPrimary text-[8px] tablet:text-[8.5px] desktop:text-[9.5px] xl-screen:text-[11.5px]  mb-[1px] font-semibold">
                    {name}.@{author}
                  </p>
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
