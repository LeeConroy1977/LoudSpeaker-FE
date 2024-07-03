import React from "react";
import articles from "../../data/articles";
import FeaturedCard from "./FeaturedCard";

const FeaturedList = () => {
  const featuredArticles = articles.filter((article) => article.featured);

  console.log(featuredArticles);

  return (
    <div
      className="h-[100px] w-[580px] sm:h-full sm:w-full flex flex-row  sm:flex-col  m-2 mt-1 mb-2 gap-2  sm:gap-3 
    "
    >
      {featuredArticles.map((article) => {
        return <FeaturedCard key={article.id} article={article} />;
      })}
    </div>
  );
};

export default FeaturedList;
