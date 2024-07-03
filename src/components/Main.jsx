import React, { useContext } from "react";
import FeaturedSection from "./FeaturedSection";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";

const Main = () => {
  const { width, height } = useContext(ScreenSizeContext);
  return (
    <div className="sm:col-span-1 sm:row-span-1">
      {width < 640 && <FeaturedSection />}
    </div>
  );
};

export default Main;
