import React, { useContext, useEffect } from "react";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import NavBar from "./NavBar";
import TopicSection from "./TopicSection";
import FeaturedSection from "./FeaturedSection";
import { Outlet } from "react-router-dom";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import { ArticlesContext } from "../contexts/ArticlesContext";

const AppLayout = ({
  handleSelectedArticle,
  isTopicContainerOpen,
  handleSearchInput,
  searchInput,
}) => {
  const { width } = useContext(ScreenSizeContext);
  const { isSearchOpen } = useContext(SearchOpenContext);
  const { fetchFeaturedArticles } = useContext(ArticlesContext);

  useEffect(() => {
    fetchFeaturedArticles(null, null, null, 1000, null);
  }, []);

  const containerClasses =
    width < 640
      ? `relative w-full h-full grid grid-rows-[44px_auto] grid-cols-[100%] ${
          isTopicContainerOpen ? "overflow-hidden" : ""
        }`
      : width < 900
      ? `relative w-full h-full grid grid-rows-[50px_auto] grid-cols-[100%] ${
          isTopicContainerOpen ? "overflow-hidden" : ""
        }`
      : width >= 900 && width <= 1279
      ? " relative w-[100%] h-full grid grid-rows-[10%_90%] grid-cols-[22%_50%_28%]"
      : "relative w-[78%] h-full grid grid-rows-[10%_90%] grid-cols-[22%_53%_25%]";

  const mainClasses = `relative tablet:overflow-y-scroll scrollbar-hide ${
    width < 900 && isSearchOpen ? "overflow-hidden" : ""
  }`;

  return (
    <div className={containerClasses}>
      <NavBar handleSearchInput={handleSearchInput} searchInput={searchInput} />
      {width > 900 && <TopicSection />}
      <main className={mainClasses}>
        <Outlet />
      </main>
      {width > 900 && (
        <FeaturedSection handleSelectedArticle={handleSelectedArticle} />
      )}
    </div>
  );
};

export default AppLayout;
