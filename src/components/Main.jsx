import React, { useContext } from "react";
import FeaturedSection from "./FeaturedSection";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import ComposeContainer from "./ComposeContainer";
import SearchContainer from "./SearchContainer";
import MainArticlesList from "./MainArticlesList";

const Main = ({ isSearchOpen }) => {
  const { width, height } = useContext(ScreenSizeContext);
  return (
    <div className="sm:col-span-1 sm:row-span-1 sm:overflow-hidden">
      {width < 640 && isSearchOpen && <SearchContainer />}
      {width < 640 && <FeaturedSection />}
      {width > 640 && <ComposeContainer />}
      <MainArticlesList />
    </div>
  );
};

export default Main;
