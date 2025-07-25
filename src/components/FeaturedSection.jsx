import React, { useContext } from "react";
import FeaturedList from "./FeaturedList";
import LoadingSpinner from "../reuseable-components/LoadingSpinner";
import { ArticlesContext } from "../contexts/ArticlesContext";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";

const FeaturedSection = ({ handleSelectedArticle }) => {
  const { isSearchOpen } = useContext(SearchOpenContext);
  const { width } = useContext(ScreenSizeContext);
  const {
    state: { loading },
  } = useContext(ArticlesContext);
  return (
    <section
      className={`${
        isSearchOpen && width < 640 ? "bg-black bg-opacity-80 z-20" : ""
      } border-b border-l-none border-r-none tablet:border-l tablet:border-r  border-gray-200 dark:border-primary w-full h-[140px] tablet-portrait:h-[200px] tablet:h-full tablet:col-span-1  tablet:row-span-1 tablet-portrait:px-3 tablet:py-3`}>
      <h3 className="w-full h-[14px] text-[12px] tablet-portrait:text-[14px] tablet:text-[13px] xl-screen:text-[15px] tablet:font-bold font-bold text-primary dark:text-darkTextPrimary mx-3 my-1 tablet:ml-4 mt-2 tablet-portrait:mt-3 tablet:mt-0 ">
        Featured Articles
      </h3>
      <div className="w-full h-full tablet:h-[96%]  tablet:border tablet:flex tablet:item justify-center tablet:border-gray-200 dark:border-primary  tablet:p-1 tablet:rounded-xl overflow-auto mt-1 tablet:mt-3 scrollbar-hide ">
        {loading ? (
          <div className="w-[100%] h-[600px] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <FeaturedList handleSelectedArticle={handleSelectedArticle} />
        )}
      </div>
    </section>
  );
};

export default FeaturedSection;
