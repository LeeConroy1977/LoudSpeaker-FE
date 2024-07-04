import React, { useContext, useState } from "react";
import FeaturedSection from "./FeaturedSection";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import ComposeContainer from "./ComposeContainer";
import SearchContainer from "./SearchContainer";
import articlesArray from "../../data/articles";
import OptionsContainer from "./OptionsContainer";
import MainArticlesList from "./MainArticlesList";

const Main = ({ isSearchOpen }) => {
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

export default Main;
