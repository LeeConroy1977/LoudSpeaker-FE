import React, { useContext } from "react";
import FeaturedCard from "./FeaturedCard";
import { FeaturedArticlesContext } from "../contexts/FeaturedArticlesContext";

const FeaturedList = ({ handleSelectedArticle }) => {
  const { featuredArticles } = useContext(FeaturedArticlesContext);

  const sortedFeaturedArticles = featuredArticles.sort(
    (a, b) => b.votes - a.votes
  );

  return (
    <div className="h-[100px] w-[580px] sm:h-full sm:w-full flex flex-row  sm:flex-col  m-2 mt-1 mb-2 ml-3 sm:ml-1 sm:mr-0 gap-2 sm:gap-3 ">
      {sortedFeaturedArticles &&
        sortedFeaturedArticles.map((article) => {
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
