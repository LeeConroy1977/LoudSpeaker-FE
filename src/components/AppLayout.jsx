import React, { useContext } from "react";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import NavBar from "./NavBar";
import TopicSection from "./TopicSection";
import FeaturedSection from "./FeaturedSection";
import { Outlet } from "react-router-dom";
import { SearchOpenContext } from "../contexts/SearchOpenContext";

const AppLayout = ({
  handleSelectedArticle,
  isTopicContainerOpen,
  handleSearchInput,
  searchInput,
}) => {
  const { width } = useContext(ScreenSizeContext);
  const { isSearchOpen } = useContext(SearchOpenContext);

  const containerClasses =
    width < 640
      ? `w-full h-full grid grid-rows-[44px_auto] grid-cols-[100%] ${
          isTopicContainerOpen ? "overflow-hidden" : ""
        }`
      : "w-[78%] h-full grid grid-rows-[10%_90%] grid-cols-[22%_53%_25%]";

  const mainClasses = `relative sm:overflow-y-scroll scrollbar-hide ${
    width < 640 && isSearchOpen ? "overflow-hidden" : ""
  }`;

  return (
    <div className={containerClasses}>
      <NavBar handleSearchInput={handleSearchInput} searchInput={searchInput} />
      {width > 640 && <TopicSection />}

      <main className={mainClasses}>
        <Outlet />
      </main>

      {width > 640 && (
        <FeaturedSection handleSelectedArticle={handleSelectedArticle} />
      )}
    </div>
  );
};

export default AppLayout;
