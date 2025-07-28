import React from "react";
import { Link } from "react-router-dom";
import useSearchToggle from "../hooks/UseSearchOpenToggle";

const SearchBarCard = ({ article }) => {
  const { title, body, article_img_url } = article;
  const { toggleSearchOpen } = useSearchToggle();

  const reducedBody = body.split(" ").slice(0, 12).join(" ");
  return (
    <Link to={`/articles/${article.article_id}`}>
      <div
        className="flex justify-start items-center w-full h-[90px] tablet-portrait:h-[110px]   tablet:w-full tablet:min-h-[100px]  xl-screen:min-h-[110px] border-b border-gray-200 dark:border-primary p-1 tablet:p-1 tablet:pb-1 cursor-pointer"
        onClick={toggleSearchOpen}>
        <div className="flex flex-col justify-start items-start w-[70%] tablet:w-[76%] h-full pr-5 ">
          <div className=" text-[0.6rem] tablet-portrait:text-[0.95rem] tablet:text-[0.7rem] desktop:text-[0.675rem] xl-screen:text-[0.85rem] mt-1 tablet:mt-2 font-semibold dark:text-darkTextPrimary">
            {title}
          </div>
          <div className="text-[0.6rem] tablet-portrait:text-[0.8rem] tablet:text-[0.7rem] desktop:text-[0.675rem] xl-screen:text-[0.8rem] mt-2 xl-screen:mt-1 mb-2 dark:text-darkTextPrimary text-gray-700 font-medium ">
            {reducedBody}...
          </div>
        </div>
        <img
          src={article_img_url}
          alt=""
          className="w-[94px] h-[80%] tablet-portrait:w-[180px] tablet:w-[110px] desktop:w-[120px] xl-screen:w-[150px] tablet-portrait:h-[88%] rounded-lg"
        />
      </div>
    </Link>
  );
};

export default SearchBarCard;
