import React, { Children, useContext, useState } from "react";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import NavBar from "./NavBar";
import TopicSection from "./TopicSection";
import FeaturedSection from "./FeaturedSection";
import Main from "./Main";
import { Outlet } from "react-router-dom";

const AppLayout = ({
  handleSearchOpen,
  handleSelectedArticle,
  isTopicContainerOpen,
}) => {
  const { width, height } = useContext(ScreenSizeContext);

  return (
    <div
      className={
        width < 640
          ? `w-full h-full  grid grid-rows-[44px_auto] grid-cols-[100%] ${
              isTopicContainerOpen ? "overflow-hidden" : null
            }`
          : "w-[76%] h-full grid grid-rows-[10%_90%]  grid-cols-[21%_54%_25%]"
      }
    >
      <NavBar handleSearchOpen={handleSearchOpen} />
      {width > 640 && <TopicSection />}

      <main className="sm:overflow-auto">
        <Outlet />
      </main>
      {width > 640 && (
        <FeaturedSection handleSelectedArticle={handleSelectedArticle} />
      )}
    </div>
  );
};

export default AppLayout;
