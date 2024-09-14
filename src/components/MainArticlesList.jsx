import React, { useContext, useEffect, useState } from "react";

import MainArticlesCard from "./MainArticlesCard";
import { ArticlesContext } from "../contexts/ArticlesContext";
import { ExistingUserContext } from "../contexts/ExistingUsersContext";
import Button from "../reuseable-components/Button";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { AllArticlesCountContext } from "../contexts/AllArticlesCountContext";
import { SearchParamsContext } from "../contexts/searchParamsContext";
import { TotalArticlesContext } from "../contexts/TotalArticlesContext";

const MainArticlesList = ({ handleOnLoadMore, visible, divRef }) => {
  const { articles } = useContext(ArticlesContext);
  const { existingUsers } = useContext(ExistingUserContext);
  const { isSearchOpen } = useContext(SearchOpenContext);
  const { width } = useContext(ScreenSizeContext);
  const { totalArticles } = useContext(TotalArticlesContext);
  const { searchParams } = useContext(SearchParamsContext);
  const topicParam = searchParams.get("topic");

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleLoadMoreClick = () => {
    // Save current scroll position
    setScrollPosition(divRef.current.scrollTop);

    // Call the function to load more articles
    handleOnLoadMore();
  };

  React.useEffect(() => {
    // Restore scroll position after articles have been loaded
    divRef.current.scrollTop = scrollPosition;
  }, [articles]); // Dependency on articles to update when they change

  return (
    <div
      ref={divRef}
      className={`sm:w-full sm:h-full sm:overflow-auto mt-4 sm:mt-0 ${
        isSearchOpen && width < 640 ? "bg-black bg-opacity-20" : null
      }`}
    >
      {articles &&
        existingUsers &&
        articles.map((article) => (
          <MainArticlesCard
            key={article.article_id}
            article={article}
            users={existingUsers}
          />
        ))}
      <div className="w-[100%] h-[80px] sm:h-[60px] flex items-center justify-center">
        {totalArticles > 0 ? (
          visible < totalArticles ? (
            <Button
              handleClick={handleLoadMoreClick}
              buttonStyle="buttonMediumShowMore"
            >
              Load More Articles
            </Button>
          ) : totalArticles === 0 ? null : (
            <Button
              handleClick={() =>
                divRef.current.scrollIntoView({ behavior: "smooth" })
              }
              buttonStyle="buttonMediumShowMore"
            >
              Back To Top
            </Button>
          )
        ) : null}
      </div>
    </div>
  );
};

export default MainArticlesList;
