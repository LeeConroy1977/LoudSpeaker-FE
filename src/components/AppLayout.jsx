import React, { Children, useContext } from "react";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import NavBar from "./NavBar";
import TopicSection from "./TopicSection";
import FeaturedSection from "./FeaturedSection";
import Main from "./Main";

const AppLayout = () => {
  const { width, height } = useContext(ScreenSizeContext);
  console.log(width);

  return (
    <>
      {width < 640 ? (
        <div className="w-full h-full bg-blue-500 grid grid-rows-[44px_auto] ">
          <NavBar />
          <Main>{Children}</Main>
        </div>
      ) : (
        <div
          style={{ width: "76vw" }}
          className="w-full h-full bg-red-500 grid grid-rows-[9%_91%]  grid-cols-[20%_57%_23%]"
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
