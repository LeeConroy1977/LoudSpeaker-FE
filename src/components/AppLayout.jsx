import React, { Children, useContext, useState } from "react";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import NavBar from "./NavBar";
import TopicSection from "./TopicSection";
import FeaturedSection from "./FeaturedSection";
import Main from "./Main";

const AppLayout = () => {
  const { width, height } = useContext(ScreenSizeContext);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  console.log(isSearchOpen);

  function handleSearchOpen() {
    return setIsSearchOpen(!isSearchOpen);
  }

  return (
    <>
      {width < 640 ? (
        <div className="w-full h-full  grid grid-rows-[44px_auto] grid-cols-[100%] ">
          <NavBar handleSearchOpen={handleSearchOpen} />
          <Main isSearchOpen={isSearchOpen}>{Children}</Main>
        </div>
      ) : (
        <div
          style={{ width: "76vw" }}
          className="w-full h-full grid grid-rows-[10%_90%]  grid-cols-[20%_57%_23%]"
        >
          <NavBar />
          <TopicSection />
          <Main>{Children}</Main>
          <FeaturedSection />
        </div>
      )}
    </>
  );
};

export default AppLayout;
