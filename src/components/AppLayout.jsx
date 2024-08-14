import React, { Children, useContext, useState } from "react";
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

  return (
    <div
      className={
        width < 640
          ? `w-full h-full  grid grid-rows-[44px_auto] grid-cols-[100%] ${
              isTopicContainerOpen ? "overflow-hidden" : null
            }`
          : "w-[80%] h-full grid grid-rows-[10%_90%]  grid-cols-[22%_53%_25%]"
      }
    >
      <NavBar handleSearchInput={handleSearchInput} searchInput={searchInput} />
      {width > 640 && <TopicSection />}

      <main
        className={`relative sm:overflow-auto ${
          width < 640 && isSearchOpen ? "overflow-hidden" : null
        }`}
      >
        <Outlet />
      </main>
      {width > 640 && (
        <FeaturedSection handleSelectedArticle={handleSelectedArticle} />
      )}
    </div>
  );
};

export default AppLayout;
