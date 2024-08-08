import React, { useContext, useState } from "react";

import MainArticlesCard from "./MainArticlesCard";
import { ArticlesContext } from "../contexts/ArticlesContext";
import { ExistingUserContext } from "../contexts/ExistingUsersContext";

const MainArticlesList = ({
  handleSelectedArticle,
  allArticles,
  handleOnLoadMore,
  visible,
}) => {
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
      {allArticles > 0 ? (
        visible < allArticles ? (
          <div>
            <button onClick={() => handleOnLoadMore()}>Load More</button>
          </div>
        ) : (
          <div>
            <div>Sorry, that's all folks! No more to load.</div>
          </div>
        )
      ) : null}
    </div>
  );
};

export default MainArticlesList;
