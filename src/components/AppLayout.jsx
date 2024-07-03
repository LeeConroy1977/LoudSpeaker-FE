import React, { Children, useContext } from "react";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import NavBar from "./NavBar";
import TopicSection from "./TopicSection";
import FeaturedSection from "./FeaturedSection";
import Main from "./Main";

const AppLayout = () => {
  const { width, height } = useContext(ScreenSizeContext);

  return (
    <>
      {width < 640 ? (
        <div className="w-full h-full  grid grid-rows-[44px_auto] ">
          <NavBar />
          <Main>{Children}</Main>
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
