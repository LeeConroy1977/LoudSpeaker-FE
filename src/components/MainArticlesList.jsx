import React, { useContext, useEffect, useRef, memo } from "react";
import MainArticlesCard from "./MainArticlesCard";
import { ArticlesContext } from "../contexts/ArticlesContext";
import { ExistingUserContext } from "../contexts/ExistingUsersContext";
import Button from "../reuseable-components/Button";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { ArticleScrollContext } from "../contexts/ArticleScrollContext";
import { InitialRenderContext } from "../contexts/InitialRenderContext";
import LoadingSpinner from "../reuseable-components/LoadingSpinner";

const MainArticlesList = memo(({ handleOnLoadMore, topicParam }) => {
  const {
    state: { articles, totalArticles, loading, error },
  } = useContext(ArticlesContext);
  const { existingUsers } = useContext(ExistingUserContext);
  const { isSearchOpen } = useContext(SearchOpenContext);
  const { width } = useContext(ScreenSizeContext);
  const { articlesRef, handleScrollToTop } = useContext(ArticleScrollContext);

  const scrollPositionRef = useRef(null);
  const isLoadingMoreRef = useRef(false);

  const handleLoadMore = () => {
    if (articlesRef.current) {
      isLoadingMoreRef.current = true;
      scrollPositionRef.current = articlesRef.current.scrollTop;
      handleOnLoadMore();
    }
  };

  useEffect(() => {
    if (
      !loading &&
      isLoadingMoreRef.current &&
      scrollPositionRef.current !== null &&
      articlesRef.current
    ) {
      setTimeout(() => {
        articlesRef.current.scrollTo({
          top: scrollPositionRef.current,
          behavior: "auto",
        });
        isLoadingMoreRef.current = false;
      }, 100);
    }
  }, [loading, articles]);

  return (
    <div
      ref={articlesRef}
      className={`relative tablet:w-full tablet:h-screen tablet:overflow-auto scrollbar-hide mt-4  tablet-portrait:mt-0 tablet-portrait:px-3 tablet:px-0 ${
        isSearchOpen && width < 640 ? "bg-black bg-opacity-80 z-20" : ""
      }`}>
      {loading && articles.length === 0 ? (
        <div className="flex items-center justify-center w-full h-[300px] tablet:h-[600px]">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : articles.length > 0 && existingUsers ? (
        articles.map((article) => (
          <MainArticlesCard
            key={article.article_id}
            article={article}
            users={existingUsers}
          />
        ))
      ) : (
        <p className="text-center">No articles available</p>
      )}

      <div className="w-full h-16 tablet:h-14 flex items-center justify-center">
        {!topicParam &&
          totalArticles > 0 &&
          (articles.length < totalArticles ? (
            <Button
              handleClick={handleLoadMore}
              buttonStyle="buttonMediumShowMore"
              disabled={loading || !articlesRef.current}>
              Load More Articles
            </Button>
          ) : (
            <Button
              buttonStyle="buttonMediumShowMore"
              handleClick={handleScrollToTop}>
              Back To Top
            </Button>
          ))}
      </div>
    </div>
  );
});

export default MainArticlesList;
