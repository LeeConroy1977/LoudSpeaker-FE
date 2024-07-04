import React, { useState } from "react";
import articlesArray from "../../data/articles";
import users from "../../data/users";
import MainArticlesCard from "./MainArticlesCard";

const MainArticlesList = () => {
  const [articles, setArticles] = useState(articlesArray);

  return (
    <div className="sm:w-full sm:h-full sm:overflow-auto">
      {articlesArray &&
        users &&
        articles.map((article) => {
          return (
            <MainArticlesCard
              key={article.title}
              article={article}
              users={users}
            />
          );
        })}
    </div>
  );
};

export default MainArticlesList;
