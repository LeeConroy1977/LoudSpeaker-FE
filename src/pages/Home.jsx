import React, { useContext, useState } from "react";
import SearchContainer from "../components/SearchContainer";
import OptionsContainer from "../components/OptionsContainer";
import FeaturedSection from "../components/FeaturedSection";
import ComposeContainer from "../components/ComposeContainer";
import MainArticlesList from "../components/MainArticlesList";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import articlesArray from "../../data/articles";
import ComposeForm from "../components/ComposeForm";
import TopicAccordion from "../components/TopicAccordion";
import Model from "../reuseable-components/Model";

const Home = ({
  isSearchOpen,
  handleComposeOpen,
  isComposeOpen,
  handleSelectedArticle,
  isTopicContainerOpen,
  handleTopicContainer,
}) => {
  const { width, height } = useContext(ScreenSizeContext);
  const [articles, setArticles] = useState(articlesArray);

  return (
    <div className="sm:col-span-1 sm:row-span-1 sm:overflow-hidden relative">
      {width < 640 && isSearchOpen && <SearchContainer />}
      {width < 640 && (
        <OptionsContainer handleTopicContainer={handleTopicContainer} />
      )}
      {width < 640 && isTopicContainerOpen && (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60  z-40"></div>
          <Model handleClick={handleTopicContainer}>
            <TopicAccordion handleTopicContainer={handleTopicContainer} />
          </Model>
        </>
      )}
      {width < 640 && <FeaturedSection />}
      {width > 640 && isComposeOpen ? (
        <ComposeForm handleComposeOpen={handleComposeOpen} />
      ) : (
        width > 640 && (
          <ComposeContainer handleComposeOpen={handleComposeOpen} />
        )
      )}
      {width > 640 && <OptionsContainer />}
      <MainArticlesList
        articles={articles}
        handleSelectedArticle={handleSelectedArticle}
      />
    </div>
  );
};

export default Home;
