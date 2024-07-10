import React, { useContext, useState } from "react";

import MainArticlesCard from "./MainArticlesCard";
import { ArticlesContext } from "../contexts/ArticlesContext";
import { ExistingUserContext } from "../contexts/ExistingUsersContext";

const MainArticlesList = ({ handleSelectedArticle }) => {
  const { articles } = useContext(ArticlesContext);
  const { existingUsers } = useContext(ExistingUserContext);

  return (
    <div className="sm:w-full sm:h-full sm:overflow-auto">
      {articles &&
        existingUsers &&
        articles.map((article) => {
          return (
            <MainArticlesCard
              key={article.article_id}
              article={article}
              users={existingUsers}
              handleSelectedArticle={handleSelectedArticle}
            />
          );
        })}
    </div>
  );
};

export default MainArticlesList;
