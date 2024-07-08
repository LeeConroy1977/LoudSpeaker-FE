import React from "react";

const SearchBarCard = ({ article }) => {
  const { title, body, article_img_url } = article;

  const reducedBody = body.split(" ").slice(0, 12).join(" ");
  return (
    <div className="flex justify-between items-center w-full h-[82px]   sm:w-full sm:h-[84px]  border-b border-gray-200 sm:p-2">
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
  );
};

export default SearchBarCard;
