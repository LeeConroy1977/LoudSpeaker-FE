import React, { useContext, useState } from "react";
import SearchContainer from "../components/SearchContainer";
import OptionsContainer from "../components/OptionsContainer";
import FeaturedSection from "../components/FeaturedSection";
import ComposeContainer from "../components/ComposeContainer";
import MainArticlesList from "../components/MainArticlesList";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import articlesArray from "../../data/articles";
import ComposeForm from "../components/ComposeForm";

const Home = ({
  isSearchOpen,
  setIsSearchOpen,
  handleComposeOpen,
  isComposeOpen,
  handleSelectedArticle,
  popularArticles,
}) => {
  const { width, height } = useContext(ScreenSizeContext);
  const [articles, setArticles] = useState(articlesArray);
  return (
    <div className="sm:col-span-1 sm:row-span-1 sm:overflow-hidden flex flex-col h-auto">
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
      <MainArticlesList
        articles={articles}
        handleSelectedArticle={handleSelectedArticle}
      />
    </div>
  );
};

export default Home;
