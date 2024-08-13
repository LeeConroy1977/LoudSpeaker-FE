import React, { useContext, useRef, useState } from "react";
import SearchContainer from "../components/SearchContainer";
import OptionsContainer from "../components/OptionsContainer";
import FeaturedSection from "../components/FeaturedSection";
import ComposeContainer from "../components/ComposeContainer";
import MainArticlesList from "../components/MainArticlesList";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import ComposeForm from "../components/ComposeForm";
import LoadingSpinner from "../reuseable-components/LoadingSpinner";

const Home = ({
  isSearchOpen,
  setIsSearchOpen,
  handleComposeOpen,
  isComposeOpen,
  handleSelectedArticle,
  popularArticles,
  allArticles,
  handleOnLoadMore,
  visible,
  isMainArticlesLoading,
}) => {
  const { width } = useContext(ScreenSizeContext);
  const divRef = useRef(null);

  return (
    <div
      className="sm:col-span-1 sm:row-span-1 sm:overflow-hidden flex flex-col h-auto"
      ref={divRef}
    >
      {width < 640 && !isComposeOpen && isSearchOpen && (
        <SearchContainer
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          popularArticles={popularArticles}
        />
      )}

      {width < 640 && !isComposeOpen && <OptionsContainer />}
      {width < 640 && !isComposeOpen && (
        <FeaturedSection isSearchOpen={isSearchOpen} />
      )}
      {isComposeOpen ? (
        <ComposeForm handleComposeOpen={handleComposeOpen} />
      ) : (
        width > 640 && (
          <ComposeContainer
            handleComposeOpen={handleComposeOpen}
            isComposeOpen={isComposeOpen}
          />
        )
      )}
      {width > 640 && !isComposeOpen && <OptionsContainer />}
      {isMainArticlesLoading ? (
        <div className="w-[100%] h-[400px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <MainArticlesList
          handleSelectedArticle={handleSelectedArticle}
          allArticles={allArticles}
          handleOnLoadMore={handleOnLoadMore}
          visible={visible}
          divRef={divRef}
        />
      )}
    </div>
  );
};

export default Home;
