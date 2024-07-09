import React, { useContext, useState } from "react";
import SearchContainer from "../components/SearchContainer";
import OptionsContainer from "../components/OptionsContainer";
import FeaturedSection from "../components/FeaturedSection";
import ComposeContainer from "../components/ComposeContainer";
import MainArticlesList from "../components/MainArticlesList";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import articlesArray from "../../data/articles";
import ComposeForm from "../components/ComposeForm";
import Model from "../reuseable-components/Model";
import SignIn from "../components/SignIn";
import TopicAccordion from "../components/TopicAccordion";
import { UserContext } from "../contexts/UserContext";

const Home = ({
  isSearchOpen,
  setIsSearchOpen,
  handleComposeOpen,
  isComposeOpen,
  handleSelectedArticle,
  popularArticles,
  handleTopicContainer,
  isTopicContainerOpen,
  isSignInContainerOpen,
  handleSignInContainerClosed,
  hasSignInContainerClosed,
}) => {
  const { width, height } = useContext(ScreenSizeContext);
  const [articles, setArticles] = useState(articlesArray);
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="sm:col-span-1 sm:row-span-1 sm:overflow-hidden flex flex-col h-auto">
      {((!user.username && isSignInContainerOpen) ||
        (user.username && !hasSignInContainerClosed)) && (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60  z-0"></div>
          <Model handleClick={handleSignInContainerClosed}>
            <SignIn handleSignInContainerClosed={handleSignInContainerClosed} />
          </Model>
        </>
      )}
      {width < 640 && !isComposeOpen && isSearchOpen && (
        <SearchContainer
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          popularArticles={popularArticles}
        />
      )}
      {width < 640 && isTopicContainerOpen && (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60  z-40"></div>
          <Model
            handleClick={handleTopicContainer}
            isTopicContainerOpen={isTopicContainerOpen}
          >
            <TopicAccordion handleTopicContainer={handleTopicContainer} />
          </Model>
        </>
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
