import React, { useContext } from "react";
import FeaturedCard from "./FeaturedCard";
import { ArticlesContext } from "../contexts/ArticlesContext";

const FeaturedList = ({ handleSelectedArticle }) => {
  const {
    state: { featuredArticles},
  } = useContext(ArticlesContext);

  const sortedFeaturedArticles = featuredArticles
    ?.slice(0, 8)
    .sort((a, b) => b.votes - a.votes);

  return (
    <div className="h-[100px] w-[580px]  flex flex-row  tablet:flex-col  m-2 mt-1 mb-2 ml-1 tablet:ml-1 tablet:mr-0 gap-2 tablet:gap-3 p-2 ">
      {sortedFeaturedArticles &&
        sortedFeaturedArticles?.map((article) => {
          return (
            <FeaturedCard
              key={article.title}
              article={article}
              handleSelectedArticle={handleSelectedArticle}
            />
          );
        })}
    </div>
  );
};

export default FeaturedList;
