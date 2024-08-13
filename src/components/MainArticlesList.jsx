import React, { useContext } from "react";

import MainArticlesCard from "./MainArticlesCard";
import { ArticlesContext } from "../contexts/ArticlesContext";
import { ExistingUserContext } from "../contexts/ExistingUsersContext";
import Button from "../reuseable-components/Button";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";

const MainArticlesList = ({
  handleSelectedArticle,
  allArticles,
  handleOnLoadMore,
  visible,
  divRef,
}) => {
  const { articles } = useContext(ArticlesContext);
  const { existingUsers } = useContext(ExistingUserContext);
  const { isSearchOpen } = useContext(SearchOpenContext);
  const { width } = useContext(ScreenSizeContext);

  const scrollToTop = () => {
    divRef.current.scrollIntoView({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`sm:w-full sm:h-full sm:overflow-auto ${
        isSearchOpen && width < 640 ? "bg-black bg-opacity-20" : null
      }`}
    >
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
      <div className="w-[100%] h-[80px] sm:h-[60px] flex items-center justify-center">
        {allArticles > 0 ? (
          visible < allArticles ? (
            <div>
              <Button
                handleClick={handleOnLoadMore}
                buttonStyle="buttonMediumShowMore"
              >
                Load More Articles
              </Button>
            </div>
          ) : (
            <div>
              <Button
                handleClick={scrollToTop}
                buttonStyle="buttonMediumShowMore"
              >
                Back To Top
              </Button>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default MainArticlesList;
