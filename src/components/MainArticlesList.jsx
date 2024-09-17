import React, { useContext, useEffect } from "react";
import MainArticlesCard from "./MainArticlesCard";
import { ArticlesContext } from "../contexts/ArticlesContext";
import { ExistingUserContext } from "../contexts/ExistingUsersContext";
import Button from "../reuseable-components/Button";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { TotalArticlesContext } from "../contexts/TotalArticlesContext";
import { ArticleScrollContext } from "../contexts/ArticleScrollContext";
import { useLoading } from "../contexts/LoadingContext";
import LoadingSpinner from "../reuseable-components/LoadingSpinner";
import { InitialRenderContext } from "../contexts/InitialRenderContext";

const MainArticlesList = ({ handleOnLoadMore, visible }) => {
  const { articles } = useContext(ArticlesContext);
  const { existingUsers } = useContext(ExistingUserContext);
  const { isSearchOpen } = useContext(SearchOpenContext);
  const { width } = useContext(ScreenSizeContext);
  const { totalArticles } = useContext(TotalArticlesContext);
  const { articlesRef, handleScrollToTop } = useContext(ArticleScrollContext);
  const { loadingStates } = useLoading();
  const { setIsInitialRender } = useContext(InitialRenderContext);

  useEffect(() => {
    setIsInitialRender(true);
  }, [setIsInitialRender]);

  const handleLoadMoreClick = () => {
    handleOnLoadMore();
  };

  return (
    <div
      ref={articlesRef}
      className={`relative sm:w-full sm:h-screen sm:overflow-auto scrollbar-hide mt-4 sm:mt-0 ${
        isSearchOpen && width < 640 ? "bg-black bg-opacity-20" : ""
      }`}
    >
      {loadingStates.article ? (
        <div className="flex items-center width < 640 justify-center w-[100%] h-[300px] sm:h-[600px]">
          <LoadingSpinner />
        </div>
      ) : existingUsers && articles.length > 0 ? (
        articles.map((article) => (
          <MainArticlesCard
            key={article.article_id}
            article={article}
            users={existingUsers}
          />
        ))
      ) : null}

      <div className="w-full h-16 sm:h-14 flex items-center justify-center">
        {totalArticles > 0 ? (
          visible < totalArticles ? (
            <Button
              handleClick={handleLoadMoreClick}
              buttonStyle="buttonMediumShowMore"
            >
              Load More Articles
            </Button>
          ) : (
            <Button
              buttonStyle="buttonMediumShowMore"
              handleClick={handleScrollToTop}
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
