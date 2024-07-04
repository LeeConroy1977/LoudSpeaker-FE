import React, { useContext } from "react";
import FeaturedSection from "./FeaturedSection";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import ComposeContainer from "./ComposeContainer";
import SearchContainer from "./SearchContainer";

const Main = ({ isSearchOpen }) => {
  const { width, height } = useContext(ScreenSizeContext);
  return (
    <div className="sm:col-span-1 sm:row-span-1">
      {width < 640 && isSearchOpen && <SearchContainer />}
      {width < 640 && <FeaturedSection />}
      {width > 640 && <ComposeContainer />}
    </div>
  );
};

export default Main;
