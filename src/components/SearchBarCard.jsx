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
        className="flex justify-between items-center w-full h-[84px]   sm:w-full sm:h-[84px]  border-b border-gray-200 sm:p-2 cursor-pointer"
        onClick={toggleSearchOpen}
      >
        <div className="flex flex-col justify-start items-start w-[70%] sm:w-[76%] h-full">
          <div className="text-[0.675rem] mt-2 sm:mt-0 font-semibold">
            {title}
          </div>
          <div className="text-[0.6rem] mt-1 mb-2">{reducedBody}...</div>
        </div>
        <img
          src={article_img_url}
          alt=""
          className="w-[80px] h-[66%] sm:w-[80px] sm:h-[90%] rounded-lg"
        />
      </div>
    </Link>
  );
};

export default SearchBarCard;
