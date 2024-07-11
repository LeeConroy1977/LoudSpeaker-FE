import React, { useContext } from "react";

import FeaturedCard from "./FeaturedCard";
import { ArticlesContext } from "../contexts/ArticlesContext";
import TemporaryFeaturedArticles from "../../data/articles";

const FeaturedList = ({ handleSelectedArticle, isSearchOpen }) => {
  const { articles, setArticles } = useContext(ArticlesContext);
  const featuredArticles = TemporaryFeaturedArticles.filter(
    (article) => article.featured
  );

  return (
    <div
      className="h-[100px] w-[580px] sm:h-full sm:w-full flex flex-row  sm:flex-col  m-2 mt-1 mb-2 gap-2  sm:gap-3 
    "
    >
      {featuredArticles &&
        featuredArticles.map((article) => {
          return (
            <FeaturedCard
              key={article.title}
              article={article}
              handleSelectedArticle={handleSelectedArticle}
              isSearchOpen={isSearchOpen}
            />
          );
        })}
    </div>
  );
};

export default FeaturedList;
