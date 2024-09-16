import React, { useContext, useEffect, useRef, useState } from "react";

import MainArticlesCard from "./MainArticlesCard";
import { ArticlesContext } from "../contexts/ArticlesContext";
import { ExistingUserContext } from "../contexts/ExistingUsersContext";
import Button from "../reuseable-components/Button";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { TotalArticlesContext } from "../contexts/TotalArticlesContext";
import { ArticleScrollContext } from "../contexts/ArticleScrollContext";
import { useLoading } from "../contexts/LoadingContext";
import LoadingSpinner from "../reuseable-components/LoadingSpinner"; // Ensure this import is correct
import IntroLoader from "./IntroLoader";
import { InitialRenderContext } from "../contexts/InitialRenderContext";

const MainArticlesList = ({ handleOnLoadMore, visible, divRef }) => {
  const { articles } = useContext(ArticlesContext);
  const { existingUsers } = useContext(ExistingUserContext);
  const { isSearchOpen } = useContext(SearchOpenContext);
  const { width } = useContext(ScreenSizeContext);
  const { totalArticles } = useContext(TotalArticlesContext);
  const { articlesRef, handleScrollToTop } = useContext(ArticleScrollContext);
  const { isInitialRender, setIsInitialRender } =
    useContext(InitialRenderContext);

  const { loadingStates } = useLoading();

  useEffect(() => {
    setIsInitialRender(true);
  }, []);

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
      {isInitialRender && loadingStates.mainArticle ? (
        <IntroLoader />
      ) : !isInitialRender && loadingStates.mainArticle ? (
        <LoadingSpinner />
      ) : articles && existingUsers && articles.length > 0 ? (
        articles.map((article) => (
          <MainArticlesCard
            key={article.article_id}
            article={article}
            users={existingUsers}
          />
        ))
      ) : (
        <div className="w-[100%] h-[600px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

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
