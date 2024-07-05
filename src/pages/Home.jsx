import React, { useContext, useState } from "react";
import SearchContainer from "../components/SearchContainer";
import OptionsContainer from "../components/OptionsContainer";
import FeaturedSection from "../components/FeaturedSection";
import ComposeContainer from "../components/ComposeContainer";
import MainArticlesList from "../components/MainArticlesList";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import articlesArray from "../../data/articles";

const Home = ({ isSearchOpen }) => {
  const { width, height } = useContext(ScreenSizeContext);
  const [articles, setArticles] = useState(articlesArray);
  return (
    <div className="sm:col-span-1 sm:row-span-1 sm:overflow-hidden">
      {width < 640 && isSearchOpen && <SearchContainer />}
      {width < 640 && <OptionsContainer />}
      {width < 640 && <FeaturedSection />}
      {width > 640 && <ComposeContainer />}
      {width > 640 && <OptionsContainer />}
      <MainArticlesList articles={articles} />
    </div>
  );
};

export default Home;
