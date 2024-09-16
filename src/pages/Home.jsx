import React, { useContext, useRef, useState } from "react";
import SearchContainer from "../components/SearchContainer";
import OptionsContainer from "../components/OptionsContainer";
import FeaturedSection from "../components/FeaturedSection";
import ComposeContainer from "../components/ComposeContainer";
import MainArticlesList from "../components/MainArticlesList";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import ComposeForm from "../components/ComposeForm";
import LoadingSpinner from "../reuseable-components/LoadingSpinner";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import { ComposeOpenContext } from "../contexts/ComposeOpenContext";

const Home = ({ handleOnLoadMore, visible, isMainArticlesLoading }) => {
  const { width } = useContext(ScreenSizeContext);
  const { isSearchOpen } = useContext(SearchOpenContext);
  const { isComposeOpen } = useContext(ComposeOpenContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const divRef = useRef(null);

  return (
    <div
      className="sm:col-span-1 sm:row-span-1 sm:overflow-hidden flex flex-col h-auto"
      ref={divRef}
    >
      {width < 640 && !isComposeOpen && isSearchOpen && <SearchContainer />}

      {width < 640 && !isComposeOpen && <OptionsContainer />}
      {width < 640 && !isComposeOpen && <FeaturedSection />}
      {isComposeOpen ? (
        <ComposeForm isDisabled={isDisabled} setIsDisabled={setIsDisabled} />
      ) : (
        width > 640 && <ComposeContainer setIsDisabled={setIsDisabled} />
      )}
      {width > 640 && !isComposeOpen && <OptionsContainer />}
      {isMainArticlesLoading ? (
        <div className="w-[100%] h-[400px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <MainArticlesList
          handleOnLoadMore={handleOnLoadMore}
          visible={visible}
          divRef={divRef}
        />
      )}
    </div>
  );
};

export default Home;
